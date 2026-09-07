const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add your name"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters"],
            maxlength: [100, "Name cannot exceed 100 characters"],
        },

        email: {
            type: String,
            required: [true, "Please add an email"],
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please add a valid email",
            ],
        },

        phone: {
            type: String,
            trim: true,
            maxlength: [30, "Phone number cannot exceed 30 characters"],
        },

        organization: {
            type: String,
            trim: true,
            maxlength: [150, "Organization cannot exceed 150 characters"],
        },

        type: {
            type: String,
            required: [true, "Please select an inquiry type"],
            trim: true,
        },

        message: {
            type: String,
            required: [true, "Please add a message"],
            trim: true,
            minlength: [10, "Message must be at least 10 characters"],
            maxlength: [5000, "Message cannot exceed 5000 characters"],
        },

        gdpr: {
            type: Boolean,
            required: true,
            validate: {
                validator: (value) => value === true,
                message: "You must accept the privacy policy",
            },
        },
        isRead: { type: Boolean, default: false, index: true },
        isStarred: { type: Boolean, default: false, index: true },
    },
    {
        timestamps: true,
    }
);

ContactSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);