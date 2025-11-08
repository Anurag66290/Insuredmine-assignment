# InsuredMine Assignment

This project contains two main tasks built with **Node.js**, **Express**, and **MongoDB**:

- **Task 1:** Upload and process Excel files (policy data) asynchronously using Worker Threads.
- **Task 2:** Monitor system CPU usage and schedule message insertion into MongoDB.

---

## 🚀 Features

### 🧩 Task 1: Upload Policy Excel & APIs
- Upload `.xlsx` files using `multer`.
- Process the uploaded file in a **background worker thread**.
- Insert data into multiple MongoDB collections (`User`, `Policy`, `Carrier`, `LOB`, etc.).
- Retrieve policies by username.
- Aggregate policies grouped by user.

**Endpoints:**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/upload` | Upload an Excel file |
| GET | `/policy/:username` | Get all policies by username |
| GET | `/aggregate` | Get aggregated policy count by user |

---

### ⚙️ Task 2: System Monitor + Message Scheduler

#### 1️⃣ System Monitor
- Tracks real-time CPU usage using Node.js `os` module.
- If CPU usage exceeds **70%**, the server automatically restarts.

#### 2️⃣ Message Scheduler
- API to schedule a message in MongoDB at a specific **day** and **time**.

**Endpoint:**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/schedule` | Schedule a message to be inserted at a specific time |

---

## 🧰 Tech Stack

- **Node.js** (Express)
- **MongoDB + Mongoose**
- **Multer** (file upload)
- **Worker Threads**
- **xlsx** (for Excel file parsing)
- **Nodemon** (dev)
- **OS Module** (for CPU monitoring)

---

## 📦 Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/insuredmine-assignment.git
cd insuredmine-assignment
