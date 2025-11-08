// workers/uploadWorker.js
const { parentPort } = require('worker_threads');
const mongoose = require('mongoose');
const parseFile = require('../utils/parseFile');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/insuredmine', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

parentPort.on('message', async ({ filePath }) => {
  try {
    console.log("Worker received file:", filePath);
    await parseFile(filePath);
    parentPort.postMessage({ message: 'File processed and uploaded successfully!' });
  } catch (err) {
    console.error("Worker error:", err);
    parentPort.postMessage({ error: err.message });
  } finally {
    mongoose.connection.close();
  }
});
