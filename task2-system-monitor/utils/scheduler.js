// task2/utils/scheduler.js
const Message = require('../models/Message');

function scheduleMessage(message, day, time) {
  const targetDate = new Date(`${day} ${time}`);
  const delay = targetDate - new Date();

  if (delay <= 0) {
    console.log("Time already passed, inserting immediately.");
    return Message.create({ message, scheduledFor: new Date() });
  }

  console.log(`Message scheduled for ${targetDate}`);
  setTimeout(async () => {
    console.log(`Inserting scheduled message: "${message}"`);
    await Message.create({ message, scheduledFor: targetDate });
    console.log(`Message saved in DB: "${message}"`);
  }, delay);
}

module.exports = { scheduleMessage };
