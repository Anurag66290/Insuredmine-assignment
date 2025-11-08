// task2/routes/scheduleRoutes.js
const express = require('express');
const { scheduleMessage } = require('../utils/scheduler');
const router = express.Router();

// POST /api/schedule
router.post('/schedule', (req, res) => {
  const { message, day, time } = req.body;
  if (!message || !day || !time) {
    return res.status(400).json({ error: 'message, day, and time are required' });
  }

  scheduleMessage(message, day, time);
  res.json({ status: 'Scheduled', message, day, time });
});

module.exports = router;
