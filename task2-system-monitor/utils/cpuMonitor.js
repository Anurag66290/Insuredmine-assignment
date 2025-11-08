// task2/utils/cpuMonitor.js
const os = require('os');
const { exec } = require('child_process');

function getCpuUsage() {
  const cpus = os.cpus();
  let totalIdle = 0, totalTick = 0;

  cpus.forEach((cpu) => {
    for (let type in cpu.times) totalTick += cpu.times[type];
    totalIdle += cpu.times.idle;
  });
  const idle = totalIdle / cpus.length;
  const total = totalTick / cpus.length;
  return 100 - (100 * idle) / total;
}

function startCpuMonitor() {
  setInterval(() => {
    const usage = getCpuUsage();
    console.log(`CPU Usage: ${usage.toFixed(2)}%`);
    if (usage > 70) {
      console.log("High CPU detected (>70%) — Restarting server...");
      exec("npm restart", (err) => {
        if (err) console.error("Restart failed:", err);
      });
    }
  }, 5000);
}

module.exports = { startCpuMonitor };
