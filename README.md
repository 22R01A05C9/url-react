# 🔗 URL Shortener

A simple yet powerful full-stack **URL Shortener** application that lets users generate short, shareable links from long URLs. Built using **React**, **Node.js**, **Express**, and **MongoDB**, and deployed on an **AWS EC2** instance using **Caddy** as the web server.

## 🚀 Features

- Convert long URLs into short, easy-to-share links
- Automatically redirect short URLs to the original links
- Tracks created links in Dashboards
- Clean and responsive UI using React
- Fast performance with RESTful API built on Express
- Deployed on AWS with HTTPS via Caddy

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Server**: AWS EC2
- **Web Server**: Caddy

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. Backend Setup

```bash
cd backend
npm install 
```
#### Create a `.env` file with
```ini
MONGODB_URI=your_mongodb_connection_string
BASE_URL=https://saiteja.site
PORT=5000
```
#### Run Backend
```bash
node index.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
## 🧑‍💻 Author
**Ageera Saiteja**

🌐 https://saiteja.site