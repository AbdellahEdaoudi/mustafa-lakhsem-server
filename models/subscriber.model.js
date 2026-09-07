const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please add a valid email'
        ]
    }
}, { timestamps: true });

SubscriberSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);
