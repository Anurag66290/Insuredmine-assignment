// task2/app.js
const express = require('express');
const mongoose = require('mongoose');
const scheduleRoutes = require('./routes/scheduleRoutes');
const { startCpuMonitor } = require('./utils/cpuMonitor');
const PORT = 4000;

const app = express();
app.use(express.json());


// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/insuredmine_task2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/api', scheduleRoutes);

// Start monitoring CPU
// startCpuMonitor();

app.listen(PORT, () => console.log(`Task 2 server running on port ${PORT}`));

module.exports = app;
