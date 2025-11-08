const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Worker } = require('worker_threads');
require('../models/Carrier');
require('../models/LOB');
require('../models/User');
require('../models/Policy');
const User = require('../models/User');
const Policy = require('../models/Policy');

const router = express.Router();

// Create uploads folder if missing
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

//  1. Upload & process Excel file
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const filePath = path.resolve(req.file.path);
  const workerPath = path.resolve(__dirname, '../workers/uploadWorker.js');

  console.log('📁 Uploaded file:', filePath);

  const worker = new Worker(workerPath);
  worker.postMessage({ filePath });

  worker.on('message', msg => res.json(msg));
  worker.on('error', err => res.status(500).json({ error: err.message }));
});

// 2. Get all policies by username
router.get('/policy', async (req, res) => {
  try {
    const user = await User.findOne({ firstName: req.query.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const policies = await Policy.find({ userId: user._id }).populate('carrierId lobId');
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  3. Aggregate policies by user
router.get('/aggregate', async (req, res) => {
  try {
    const data = await Policy.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $group: {
          _id: '$user.firstName',
          totalPolicies: { $sum: 1 },
          policies: { $push: '$policyNumber' }
        }
      }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
