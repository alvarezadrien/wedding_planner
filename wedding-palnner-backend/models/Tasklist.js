const mongoose = require('mongoose');

const taskListSchema = new mongoose.Schema({
    weddingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wedding',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('TaskList', taskListSchema);
