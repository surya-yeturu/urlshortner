# Deployment Guide - Shortify Pro

This guide provides step-by-step instructions for deploying Shortify Pro to production.

## 📋 Prerequisites

- GitHub/GitLab account
- Render account (for backend)
- Vercel account (for frontend)
- MongoDB Atlas account (recommended) or local MongoDB

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. Push your code to GitHub or GitLab
2. Ensure all files are committed and pushed

### Step 2: Create MongoDB Database

#### Using MongoDB Atlas (Recommended):

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (free tier is fine)
4. Create a database user:
   - Go to Database Access → Add New Database User
   - Choose Password authentication
   - Save the username and password
5. Whitelist IP addresses:
   - Go to Network Access → Add IP Address
   - For Render, add `0.0.0.0/0` (all IPs) or Render's IP ranges
6. Get connection string:
   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `shortify-pro` or your preferred database name

#### Example Connection String:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shortify-pro?retryWrites=true&w=majority
```

### Step 3: Deploy to Render

1. **Create New Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your repository

2. **Configure Service:**
   - **Name**: `shortify-pro-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables:**
   Add these in the Render dashboard:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string-here
   JWT_SECRET=generate-a-strong-random-secret-key-here
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   SERVER_URL=https://your-backend-service.onrender.com
   ```

   **Important Notes:**
   - Generate a strong `JWT_SECRET` (use a random string generator)
   - Update `FRONTEND_URL` after deploying frontend
   - Update `SERVER_URL` with your actual Render service URL

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your service URL (e.g., `https://shortify-pro-backend.onrender.com`)

### Step 4: Verify Backend

1. Test health endpoint: `https://your-backend-url.onrender.com/api/health`
2. Should return: `{"status":"OK","message":"Shortify Pro API is running"}`

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Ensure your code is pushed to GitHub/GitLab
2. Verify `frontend/.env.example` exists

### Step 2: Deploy to Vercel

1. **Import Project:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your repository

2. **Configure Project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Environment Variables:**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-service.onrender.com/api
   ```

   **Important:** Replace with your actual Render backend URL

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Step 3: Update Backend CORS

1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-project.vercel.app
   ```
3. Redeploy the backend service (or it will auto-redeploy)

## 🔄 Alternative: Deploy Both to Render

If you prefer to use Render for both:

### Frontend on Render (Static Site)

1. Create a new **Static Site** on Render
2. Connect your repository
3. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-service.onrender.com/api
   ```
5. Update backend `FRONTEND_URL` to your Render static site URL

## 🌐 Custom Domain Setup

### Backend (Render)

1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domain"
3. Add your domain and follow DNS instructions

### Frontend (Vercel)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain and configure DNS

## ✅ Post-Deployment Checklist

- [ ] Backend health check endpoint works
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] URL shortening works
- [ ] QR code generation works
- [ ] Analytics tracking works
- [ ] Redirect functionality works
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] MongoDB connection is working
- [ ] JWT authentication is working

## 🔍 Troubleshooting

### Backend Issues

1. **Build Fails:**
   - Check Node.js version (should be 18+)
   - Verify all dependencies in `package.json`
   - Check build logs in Render

2. **MongoDB Connection Error:**
   - Verify `MONGODB_URI` is correct
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **CORS Errors:**
   - Verify `FRONTEND_URL` matches exactly (no trailing slash)
   - Check browser console for specific CORS error
   - Ensure backend is redeployed after changing `FRONTEND_URL`

### Frontend Issues

1. **Build Fails:**
   - Check Vite configuration
   - Verify all dependencies are installed
   - Check build logs in Vercel

2. **API Calls Fail:**
   - Verify `VITE_API_URL` is set correctly
   - Check browser network tab for actual API calls
   - Ensure backend is accessible

3. **Environment Variables Not Working:**
   - Vite requires `VITE_` prefix for environment variables
   - Rebuild after changing environment variables
   - Check Vercel environment variables are set

## 📊 Monitoring

### Render Monitoring

- View logs in Render dashboard
- Set up alerts for service downtime
- Monitor resource usage

### Vercel Monitoring

- View analytics in Vercel dashboard
- Check function logs
- Monitor build times

## 🔐 Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong, random `JWT_SECRET`
   - Rotate secrets periodically

2. **MongoDB:**
   - Use strong database passwords
   - Limit IP access when possible
   - Enable MongoDB Atlas security features

3. **HTTPS:**
   - Both Render and Vercel provide HTTPS by default
   - Ensure all API calls use HTTPS

4. **CORS:**
   - Only allow your frontend domain
   - Don't use wildcard (`*`) in production

## 🚀 Continuous Deployment

Both Render and Vercel support automatic deployments:

- **Render**: Auto-deploys on push to main branch
- **Vercel**: Auto-deploys on push to main branch

To disable auto-deploy:
- Render: Settings → Auto-Deploy → Disable
- Vercel: Settings → Git → Production Branch → Disable

## 📝 Notes

- Render free tier may spin down after inactivity (cold start delay)
- Consider upgrading for production use
- MongoDB Atlas free tier is sufficient for small to medium applications
- Monitor usage and upgrade as needed

---

**Your application is now live! 🎉**

