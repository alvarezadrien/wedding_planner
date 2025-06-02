const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema({
    coupleName: String,
    date: Date,
    location: String,
    budget: Number,
    guestCount: Number,
    vendors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }]
});

module.exports = mongoose.model('Wedding', weddingSchema);
