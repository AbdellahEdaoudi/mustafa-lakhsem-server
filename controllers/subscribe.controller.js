const Subscriber = require("../models/subscriber.model");

// Subscribe to newsletter
exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: "This email is already subscribed" });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({
            message: "Subscribed successfully to the newsletter",
            subscriber: newSubscriber
        });
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ message: error.message || "Server error during subscription" });
    }
};
