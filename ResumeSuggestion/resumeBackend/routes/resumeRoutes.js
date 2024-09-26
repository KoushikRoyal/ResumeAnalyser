const express = require('express');
const multer = require('multer');
const Resume = require('../models/Resume.js');
const { analyzeResume } = require('../services/resumeAnalyzer.js');

const router = express.Router();

// Setup Multer for PDF file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

// File filter to accept only PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

const upload = multer({ 
    storage, 
    fileFilter 
});

// POST route to upload resume
router.post('/', upload.single('resume'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Please upload a PDF file' });
    }

    try {
        // Analyze the resume using a mock service
        const recommendations = analyzeResume(req.file.path);

        // Save the resume and recommendations to MongoDB
        const newResume = new Resume({
            filename: req.file.filename,
            recommendations
        });
        await newResume.save();

        res.json({ recommendations });
    } catch (error) {
        console.error('Error analyzing resume:', error);
        res.status(500).json({ error: 'Failed to analyze resume' });
    }
});

module.exports = router;
