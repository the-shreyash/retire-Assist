const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, age, pensionId, aadhaarNumber, phone, bankDetails } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const user = new User({
            name, email, password, age, pensionId, aadhaarNumber, phone, bankDetails
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                pensionId: user.pensionId,
                pensionStatus: user.pensionStatus,
                monthlyPension: user.monthlyPension
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating account', error: error.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                age: user.age,
                pensionId: user.pensionId,
                pensionStatus: user.pensionStatus,
                monthlyPension: user.monthlyPension,
                phone: user.phone
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// GET /api/auth/profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});

// PUT /api/auth/profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const { name, phone, bankDetails, age } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone, bankDetails, age },
            { new: true }
        ).select('-password');
        res.json({ message: 'Profile updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

module.exports = router;
