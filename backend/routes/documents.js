const express = require('express');
const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Mock OCR extraction
function mockOCRExtract(documentType, fileName) {
    const ocrData = {
        aadhaar: { name: 'Ramesh Kumar', documentNumber: '1234 5678 9012', dateOfBirth: '15/03/1960', address: '45, Gandhi Nagar, New Delhi - 110001' },
        pan: { name: 'Ramesh Kumar', documentNumber: 'ABCDE1234F', dateOfBirth: '15/03/1960', additionalInfo: { panType: 'Individual' } },
        pension_id: { name: 'Ramesh Kumar', documentNumber: 'PEN-2024-001234', additionalInfo: { department: 'Central Government', retirementDate: '30/06/2020' } },
        bank_statement: { name: 'Ramesh Kumar', documentNumber: 'XXXX1234', additionalInfo: { bankName: 'State Bank of India', ifsc: 'SBIN0001234', balance: '₹1,45,000' } },
        life_certificate: { name: 'Ramesh Kumar', documentNumber: 'LC-2026-5678', additionalInfo: { validTill: '31/12/2026', issuedBy: 'SBI Branch, Gandhi Nagar' } }
    };
    return ocrData[documentType] || { name: 'Document Owner', documentNumber: 'DOC-XXXX', additionalInfo: { type: documentType } };
}

// POST /api/documents/upload
router.post('/upload', authMiddleware, upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { documentType } = req.body;
        const extractedData = mockOCRExtract(documentType, req.file.originalname);

        const doc = new Document({
            userId: req.user.id,
            documentType: documentType || 'other',
            fileName: req.file.originalname,
            filePath: req.file.path,
            extractedData,
            status: 'verified'
        });

        await doc.save();

        res.status(201).json({
            message: 'Document uploaded and processed successfully',
            document: doc,
            extractedData
        });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading document', error: error.message });
    }
});

// GET /api/documents
router.get('/', authMiddleware, async (req, res) => {
    try {
        const documents = await Document.find({ userId: req.user.id }).sort({ uploadedAt: -1 });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error: error.message });
    }
});

// DELETE /api/documents/:id
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const doc = await Document.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!doc) return res.status(404).json({ message: 'Document not found' });
        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error: error.message });
    }
});

module.exports = router;
