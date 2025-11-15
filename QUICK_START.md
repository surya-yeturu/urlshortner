# Quick Start Guide - Shortify Pro

Get up and running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- MongoDB running (local or Atlas)

## Step 1: Clone/Download Project
```bash
# If using git
git clone <repository-url>
cd URL-SHORTNER
```

## Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
NONGODB_URI=mongodb://localhost:27017/shortify-pro
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
```

Start backend:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

## Step 3: Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Step 4: Test It Out!

1. Open `http://localhost:5173`
2. Click "Sign Up" to create an account
3. Create your first short URL
4. View analytics
5. Download QR codes

## 🎉 You're Done!

For detailed setup, see `SETUP.md`
For deployment, see `DEPLOYMENT.md`

