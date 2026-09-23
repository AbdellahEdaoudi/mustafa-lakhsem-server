const Contact = require("../models/contact.model");
const Subscriber = require("../models/subscriber.model");

// Get all contacts (for admin)
exports.getContacts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const filter = req.query.filter || "all";
        const skip = (page - 1) * limit;

        let query = {};
        if (filter === "unread") {
            query = { isRead: false };
        } else if (filter === "starred") {
            query = { isStarred: true };
        }

        const [contacts, total, unreadCount, starredCount] = await Promise.all([
            Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Contact.countDocuments(query),
            Contact.countDocuments({ isRead: false }),
            Contact.countDocuments({ isStarred: true }),
        ]);

        res.status(200).json({
            contacts,
            total,
            unreadCount,
            starredCount,
            page,
            totalPages: Math.ceil(total / limit) || 1,
            filter,
        });
    } catch (error) {
        console.error("Get Contacts Error:", error);
        res.status(500).json({ message: "Server error retrieving contacts" });
    }
};

// Get all subscribers (for admin)
exports.getSubscribers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const [subscribers, total] = await Promise.all([
            Subscriber.find().sort({ createdAt: -1 }).limit(limit).skip(skip),
            Subscriber.countDocuments(),
        ]);

        res.status(200).json({
            subscribers,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
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

