# Shortify Pro - Advanced URL Shortener

A production-ready, full-stack URL shortener application built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS.

## 🚀 Features

### User Authentication
- User registration and login
- JWT-based authentication
- Protected routes and API endpoints

### URL Shortening
- Create short URLs from long URLs
- Custom alias support
- Auto-generated random aliases (nanoid)
- URL validation
- Private URLs per user
- URL expiration (1hr, 24hr, 7 days, custom)

### QR Code Generation
- Automatic QR code generation for every short URL
- Download QR codes as PNG images
- QR code API endpoint

### Advanced Analytics
- Track every click with detailed information:
  - Timestamp
  - User-agent (browser/device)
  - IP address
  - Country (GeoIP lookup)
  - Referrer
  - Device type (mobile, tablet, desktop)
  - Browser and OS information
- Analytics dashboard with charts:
  - Clicks by day (line chart)
  - Device types (pie chart)
  - Countries (bar chart)
  - Browsers (bar chart)
- Per-URL analytics
- User-wide analytics summary

### Modern UI
- Clean, responsive design with Tailwind CSS
- Toast notifications (Sonner)
- Loading states
- Copy to clipboard functionality
- Modal components for QR codes

## 📁 Project Structure

```
URL-SHORTNER/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── urlController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Url.js
│   │   └── Analytics.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── urlRoutes.js
│   │   ├── analyticsRoutes.js
│   │   └── redirectRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── generateShortCode.js
│   │   ├── parseUserAgent.js
│   │   └── getCountryFromIP.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── URLCard.jsx
│   │   │   ├── QRModal.jsx
│   │   │   └── AnalyticsChart.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateUrlPage.jsx
│   │   │   ├── AnalyticsPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── urlService.js
│   │   │   └── analyticsService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **BCrypt** - Password hashing
- **QRCode** - QR code generation
- **UA-Parser-JS** - User agent parsing
- **GeoIP-Lite** - IP geolocation
- **Nanoid** - Short code generation
- **Express-Validator** - Input validation

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Recharts** - Chart library
- **Sonner** - Toast notifications
- **Lucide React** - Icons
- **Tailwind CSS** - Styling

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/shortify-pro
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
SERVER_URL=http://localhost:5000
```

5. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🚀 Deployment

### Backend Deployment (Render)

1. **Create a Render account** and create a new Web Service

2. **Connect your repository** or push your code to GitHub/GitLab

3. **Configure the service:**
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Node

4. **Add Environment Variables:**
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   SERVER_URL=https://your-backend-service.onrender.com
   ```

5. **Deploy** and note your backend URL (e.g., `https://shortify-pro-backend.onrender.com`)

### Frontend Deployment (Vercel)

1. **Create a Vercel account** and import your repository

2. **Configure the project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Add Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-service.onrender.com/api
   ```

4. **Deploy** and your frontend will be live!

### MongoDB Setup

#### Option 1: MongoDB Atlas (Recommended for Production)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
5. Get your connection string and update `MONGODB_URI` in your `.env` file

#### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/shortify-pro`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### URLs
- `POST /api/urls` - Create short URL (Protected)
- `GET /api/urls` - Get all user URLs (Protected)
- `GET /api/urls/:id` - Get single URL (Protected)
- `DELETE /api/urls/:id` - Delete URL (Protected)
- `GET /api/urls/:id/qr` - Get QR code (Protected)

### Analytics
- `GET /api/analytics/:shortCode` - Get analytics for specific URL (Protected)
- `GET /api/analytics/user` - Get analytics for all user URLs (Protected)

### Redirect
- `GET /:shortCode` - Redirect to long URL (Public)

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with BCrypt
- Protected API routes
- CORS configuration
- Input validation
- URL validation
- Environment variables for sensitive data

## 🎨 UI Features

- Responsive design (mobile, tablet, desktop)
- Modern card-based layout
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states
- Error handling
- Copy to clipboard functionality
- QR code modal with download option

## 📊 Analytics Features

- Real-time click tracking
- Geographic analytics (country-level)
- Device type breakdown
- Browser and OS analytics
- Referrer tracking
- Time-based analytics (clicks by day)
- Visual charts and graphs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ using the MERN stack

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your `MONGODB_URI` in `.env`
   - Verify network access if using MongoDB Atlas

2. **CORS Errors**
   - Update `FRONTEND_URL` in backend `.env`
   - Ensure frontend URL matches exactly

3. **JWT Token Errors**
   - Clear localStorage and login again
   - Check `JWT_SECRET` is set correctly

4. **Port Already in Use**
   - Change `PORT` in backend `.env`
   - Or kill the process using the port

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Happy Shortening! 🚀**

