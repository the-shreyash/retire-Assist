const express = require('express');
const User = require('../models/User');
const Document = require('../models/Document');
const Reminder = require('../models/Reminder');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// All admin routes require auth + admin role
router.use(authMiddleware, adminMiddleware);

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalDocuments = await Document.countDocuments();
        const pendingReminders = await Reminder.countDocuments({ status: 'pending' });
        const activeUsers = await User.countDocuments({ pensionStatus: 'active', role: 'user' });

        res.json({
            totalUsers,
            totalDocuments,
            pendingReminders,
            activeUsers,
            platformHealth: 'Good',
            lastUpdated: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// GET /api/admin/documents
router.get('/documents', async (req, res) => {
    try {
        const documents = await Document.find().populate('userId', 'name email').sort({ uploadedAt: -1 });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error: error.message });
    }
});

// POST /api/admin/announcements
router.post('/announcements', async (req, res) => {
    try {
        const { title, message, targetUsers } = req.body;
        // In a production app, this would send emails/SMS
        res.json({
            message: 'Announcement sent successfully',
            announcement: { title, message, sentAt: new Date().toISOString(), recipientCount: targetUsers?.length || 'all' }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error sending announcement', error: error.message });
    }
});

module.exports = router;
