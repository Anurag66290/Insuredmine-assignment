const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/insuredmine", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

app.use('/api', dataRoutes);

app.listen(5000, () => console.log('Task 1 server running on port 5000'));

module.exports = app;
