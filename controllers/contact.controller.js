const Contact = require("../models/contact.model");

// Create a new contact inquiry
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, organization, type, message, gdpr } = req.body;

        // Truncate strings to schema maximum lengths to prevent oversized payload
        const truncatedMessage = typeof message === "string" ? message.trim().slice(0, 3000) : message;
        const truncatedName = typeof name === "string" ? name.trim().slice(0, 100) : name;
        const truncatedPhone = typeof phone === "string" ? phone.trim().slice(0, 30) : phone;
        const truncatedOrg = typeof organization === "string" ? organization.trim().slice(0, 150) : organization;

        const newContact = new Contact({
            name: truncatedName,
            email: typeof email === "string" ? email.trim() : email,
            phone: truncatedPhone,
            organization: truncatedOrg,
            type,
            message: truncatedMessage,
            gdpr
        });

        await newContact.save();

        res.status(201).json({
            message: "Inquiry sent successfully",
            contact: newContact
        });
    } catch (error) {
        console.error("Create Contact Error:", error);
        res.status(500).json({ message: error.message || "Server error during creating contact" });
    }
};
