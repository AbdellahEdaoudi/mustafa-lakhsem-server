const Contact = require("../models/contact.model");
const Subscriber = require("../models/subscriber.model");

// Get all contacts (for admin)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Get Contacts Error:", error);
        res.status(500).json({ message: "Server error retrieving contacts" });
    }
};

// Get all subscribers (for admin)
exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        res.status(200).json(subscribers);
    } catch (error) {
        console.error("Get Subscribers Error:", error);
        res.status(500).json({ message: "Server error retrieving subscribers" });
    }
};

// Update isRead status of a contact message (toggle or set)
exports.updateReadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ message: "Contact message not found" });
        }

        contact.isRead = !contact.isRead;
        await contact.save();

        res.status(200).json({
            message: "Read status updated successfully",
            contact
        });
    } catch (error) {
        console.error("Update Read Status Error:", error);
        res.status(500).json({ message: "Server error updating read status" });
    }
};

// Update isStarred status of a contact message (toggle or set)
exports.updateStarredStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ message: "Contact message not found" });
        }

        contact.isStarred = !contact.isStarred;
        await contact.save();

        res.status(200).json({
            message: "Starred status updated successfully",
            contact
        });
    } catch (error) {
        console.error("Update Starred Status Error:", error);
        res.status(500).json({ message: "Server error updating starred status" });
    }
};

// Delete a contact message
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({ message: "Contact message not found" });
        }

        res.status(200).json({
            message: "Contact message deleted successfully",
            id
        });
    } catch (error) {
        console.error("Delete Contact Error:", error);
        res.status(500).json({ message: "Server error deleting contact message" });
    }
};

// Delete a subscriber email
exports.deleteSubscriber = async (req, res) => {
    try {
        const { id } = req.params;
        const subscriber = await Subscriber.findByIdAndDelete(id);

        if (!subscriber) {
            return res.status(404).json({ message: "Subscriber not found" });
        }

        res.status(200).json({
            message: "Subscriber deleted successfully",
            id
        });
    } catch (error) {
        console.error("Delete Subscriber Error:", error);
        res.status(500).json({ message: "Server error deleting subscriber" });
    }
};

