const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    documentType: {
        type: String,
        enum: ['aadhaar', 'pan', 'pension_id', 'bank_statement', 'life_certificate', 'other'],
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    extractedData: {
        name: String,
        documentNumber: String,
        dateOfBirth: String,
        address: String,
        additionalInfo: mongoose.Schema.Types.Mixed
    },
    status: {
        type: String,
        enum: ['uploaded', 'processing', 'verified', 'rejected'],
        default: 'uploaded'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Document', documentSchema);
