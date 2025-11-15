# Setup Guide - Shortify Pro

Quick setup guide for local development.

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/shortify-pro

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Server URL (for QR codes and redirects)
SERVER_URL=http://localhost:5000
```

## Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following:

```env
VITE_API_URL=http://localhost:5000/api
```

## Quick Start Commands

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## MongoDB Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/shortify-pro`

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string and update `MONGODB_URI`

