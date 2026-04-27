/**
 * LogiSmart AI - Enterprise Command Center
 * Merged & Optimized Logic v4.5
 */

// 1. CONFIGURATION
const WEATHER_API_KEY = "bd5e378503939ddaee76f12ad7a97608"; 
emailjs.init("3p5c_yu3H_IMB9R_9");

import { shipments } from './data.js';

let localData = JSON.parse(localStorage.getItem('userShipments')) || {};
let db = { ...shipments, ...localData };

// 2. MAP SETUP
const map = L.map('map', { zoomControl: false, fadeAnimation: true }).setView([20.59, 78.96], 5);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB',
    keepBuffer: 8
}).addTo(map);
let currentMarker;

// 3. EXCEL EXPORT
window.exportExcel = (tableID, filename) => {
    try {
        const table = document.getElementById(tableID);
        const wb = XLSX.utils.table_to_book(table, { sheet: filename });
        XLSX.writeFile(wb, `${filename}_${new Date().toLocaleDateString()}.xlsx`);
        showToast("Excel Export Successful", "#10b981");
    } catch (err) {
        showToast("Export Failed", "#ef4444");
    }
};

// 4. NAVIGATION
window.showSection = (sectionId) => {
    document.querySelectorAll('.section-view').forEach(s => s.classList.add('hidden-section'));
    const target = document.getElementById(`${sectionId}-view`);
    if (target) {
        target.classList.remove('hidden-section');
        target.classList.add('animate__animated', 'animate__fadeIn');
    }
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active');
};

// 5. RENDER TABLE
function renderShipmentTable() {
    const body = document.getElementById('shipment-body');
    if (!body) return;
    body.innerHTML = Object.entries(db).map(([id, data]) => `
        <tr class="animate__animated animate__fadeIn">
            <td class="fw-bold text-primary">${id}</td>
            <td>${data.customer || 'Enterprise Client'}</td>
            <td>${data.destination || 'Global Hub'}</td>
            <td><span class="badge ${data.status === 'Delayed' ? 'bg-danger' : 'bg-success'} rounded-pill">${data.status}</span></td>
            <td><button class="btn btn-sm btn-outline-danger border-0" onclick="deleteRecord('${id}')"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
}

// 6. TRACKING & WEATHER
window.performTracking = async () => {
    const id = document.getElementById('trackInput').value.toUpperCase().trim();
    const data = db[id];

    if (!data) return showToast("Signal Lost: Invalid Tracking ID", "#ef4444");

    const resBox = document.getElementById('resultBox');
    resBox.classList.remove('d-none');
    document.getElementById('detID').innerText = id;
    document.getElementById('detLoc').innerText = data.location;
    
    const tag = document.getElementById('statusTag');
    tag.innerText = data.status;
    tag.className = `badge rounded-pill mb-3 ${data.status === 'Delayed' ? 'bg-danger' : 'bg-success'}`;

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.coordinates[0]}&lon=${data.coordinates[1]}&appid=${WEATHER_API_KEY}&units=metric`);
        const w = await res.json();
        document.getElementById('detWeather').innerText = `${Math.round(w.main.temp)}°C | ${w.weather[0].main}`;
    } catch { document.getElementById('detWeather').innerText = "Climate Offline"; }

    map.flyTo(data.coordinates, 11, { duration: 2.5 });
    if(currentMarker) map.removeLayer(currentMarker);
    currentMarker = L.marker(data.coordinates).addTo(map).bindPopup(id).openPopup();
    showToast("Satellite Signal Established", "#3b82f6");
};

// 7. CREATE & EMAIL
const deployForm = document.getElementById('deployForm');
if (deployForm) {
    deployForm.onsubmit = (e) => {
        e.preventDefault();
        const id = document.getElementById('mShipID').value.toUpperCase().trim();
        const email = document.getElementById('mCustEmail').value;
        const name = document.getElementById('mCustName').value;
        const dest = document.getElementById('mDest').value;

        const entry = {
            id: id, customer: name, email: email, destination: dest,
            status: "In Processing", location: "Bengaluru Hub", coordinates: [12.97, 77.59]
        };

        localData[id] = entry;
        localStorage.setItem('userShipments', JSON.stringify(localData));
        db = { ...shipments, ...localData };

        // Email Trigger (Sends to receiver)
        emailjs.send("service_o8mcuyz", "template_btxinrh", {
            to_name: name,
            to_email: email,
            order_id: id,
            destination: dest
        }).then(() => console.log("Email Dispatched"));

        renderShipmentTable();
        bootstrap.Modal.getInstance(document.getElementById('newShipmentModal')).hide();
        deployForm.reset();
        showToast("Deployment Active: Signal Initialized", "#10b981");
    };
}

// 8. CRUD UTILS
window.deleteRecord = (id) => {
    if (confirm(`Terminate data for ${id}?`)) {
        delete localData[id];
        localStorage.setItem('userShipments', JSON.stringify(localData));
        db = { ...shipments, ...localData };
        renderShipmentTable();
        showToast("Signal Purged", "#444");
        if (document.getElementById('detID').innerText === id) {
            document.getElementById('resultBox').classList.add('d-none');
        }
    }
};

window.deleteCurrentShipment = () => {
    const id = document.getElementById('detID').innerText;
    if (id) window.deleteRecord(id);
};

function showToast(text, color) {
    Toastify({ text, gravity: "bottom", position: "center", style: { background: color, borderRadius: "50px" } }).showToast();
}

document.addEventListener('DOMContentLoaded', renderShipmentTable);