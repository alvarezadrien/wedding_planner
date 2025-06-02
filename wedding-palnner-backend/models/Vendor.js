const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    location: String,
    rating: Number,
    priceRange: String,
    contact: String,
});

module.exports = mongoose.model("Vendor", VendorSchema);
