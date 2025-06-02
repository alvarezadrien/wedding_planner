const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rsvp: { type: Boolean, default: false },
    status: { type: String, enum: ['invité', 'confirmé', 'annulé'], default: 'invité' }
});

module.exports = mongoose.model('Guest', guestSchema);