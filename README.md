# Mustafa Lakhsem - Backend API Server

A secure, scalable RESTful API backend server built with **Node.js**, **Express**, and **MongoDB** for the Mustafa Lakhsem web platform.

## 🚀 Features

- **Authentication & Authorization**: Secure JWT-based authentication with role-based access control (Admin/User).
- **Security Best Practices**:
  - Helmet for HTTP security headers
  - CORS configuration
  - Rate limiting for DDoS and brute-force mitigation
  - Passwords hashed with Bcrypt
- **Clean Architecture**: Organized separation of concerns across Routes, Controllers, Middlewares, and Models.
- **Database Integration**: Robust MongoDB connection management with Mongoose ODM.
- **Deployment Ready**: Optimized for serverless deployment on Vercel.

## 📁 Project Structure

```text
server/
├── config/             # Configuration files (DB connection, CORS, etc.)
├── controllers/        # Request handlers and business logic
├── middlewares/        # Custom middlewares (JWT verification, rate limiters, role checks)
├── models/             # Mongoose schemas and data models
├── routes/             # API route definitions
├── views/              # Static HTML fallbacks (Index & 404 pages)
├── .env.example        # Environment variables template
├── server.js           # Express application entry point
└── vercel.json         # Vercel serverless deployment configuration
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (jsonwebtoken) & bcryptjs
- **Security**: Helmet, CORS, Express-Rate-Limit

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdellahEdaoudi/mustafa-lakhsem-server.git
   cd mustafa-lakhsem-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and configure:
   ```env
   PORT=5000
   DATABASE_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_access_secret
   REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
   FRONTEND_URL=http://localhost:5173
   ```

4. **Run the server:**
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## 📄 License
ISC
