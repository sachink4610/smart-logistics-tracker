/**
 * LogiSmart AI - Global Shipment Database
 * This serves as the primary data source for the tracking system.
 */

export const shipments = {
    // --- BENGALURU HUB ---
    "SN-789": {
        location: "Electronic City, Bengaluru",
        status: "In Transit",
        coordinates: [12.8452, 77.6633],
        destination: "Mumbai",
        eta: "14 Hours",
        type: "Electronics"
    },
    "BLR-202": {
        location: "Whitefield Hub, Bengaluru",
        status: "Delayed",
        coordinates: [12.9698, 77.7500],
        destination: "Chennai",
        eta: "2 Days",
        type: "Medical Supplies"
    },

    // --- MUMBAI HUB ---
    "MUM-505": {
        location: "JNPT Port, Mumbai",
        status: "Processing",
        coordinates: [18.9500, 72.9500],
        destination: "Dubai (Sea)",
        eta: "5 Days",
        type: "Container Freight"
    },
    "BOM-911": {
        location: "Andheri Cargo Terminal",
        status: "In Transit",
        coordinates: [19.1136, 72.8697],
        destination: "London (Air)",
        eta: "9 Hours",
        type: "Priority Parcel"
    },

    // --- DELHI HUB ---
    "DEL-101": {
        location: "Okhla Industrial Area, Delhi",
        status: "In Transit",
        coordinates: [28.5355, 77.2732],
        destination: "Chandigarh",
        eta: "5 Hours",
        type: "Automotive Parts"
    },
    "NCR-888": {
        location: "Gurugram Logistics Park",
        status: "Delivered",
        coordinates: [28.4595, 77.0266],
        destination: "Local Delivery",
        eta: "Completed",
        type: "E-commerce"
    },

    // --- HYDERABAD HUB ---
    "HYD-444": {
        location: "Gachibowli Tech-Park",
        status: "In Transit",
        coordinates: [17.4401, 78.3489],
        destination: "Pune",
        eta: "18 Hours",
        type: "IT Hardware"
    },

    // --- CHENNAI HUB ---
    "MAA-303": {
        location: "Ennore Port, Chennai",
        status: "In Transit",
        coordinates: [13.2161, 80.3235],
        destination: "Singapore",
        eta: "4 Days",
        type: "Raw Materials"
    },

    // --- KOLKATA HUB ---
    "KOL-606": {
        location: "Haldia Dock, Kolkata",
        status: "Processing",
        coordinates: [22.0620, 88.0698],
        destination: "Dhaka",
        eta: "24 Hours",
        type: "Textiles"
    },

    // --- AHMEDABAD HUB ---
    "AMD-707": {
        location: "Sanand Industrial Estate",
        status: "In Transit",
        coordinates: [22.9868, 72.3787],
        destination: "Jaipur",
        eta: "12 Hours",
        type: "Pharmaceuticals"
    }
};