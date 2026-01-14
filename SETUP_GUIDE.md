# Vibe Delivery - Project Setup Guide

A parcel delivery application with React frontend and Node.js/Express backend.

## Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **daisyUI** - Component library
- **Axios** - API calls
- **Zustand** - State management

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

---

## Project Structure

```
vibe-delivery/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Route definitions
│   │   ├── services/       # API services
│   │   ├── stores/         # Zustand stores
│   │   ├── styles/         # Global styles
│   │   ├── utils/          # Helper functions
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Global CSS
│   ├── .env.local          # Environment variables
│   └── package.json
│
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   ├── utils/          # Helper functions
│   │   └── server.js       # Main server file
│   ├── .env                # Environment variables
│   └── package.json
│
├── PROJECT_PLAN.md         # Project documentation
└── README.md               # Setup instructions
```

---

## Frontend Setup Steps

### 1. Create React App

```bash
cd vibe-delivery
npx create-react-app frontend
cd frontend
```

### 2. Install Dependencies

```bash
npm install react-router-dom axios zustand
npm install -D tailwindcss postcss autoprefixer
npm install daisyui
```

### 3. Configure Tailwind CSS

```bash
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
```

### 4. Update `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Environment Variables

Create `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

### 6. Folder Structure Creation

```bash
mkdir -p src/{components,pages,routes,services,stores,styles,utils}
```

---

## Backend Setup Steps

### 1. Initialize Node Project

```bash
cd vibe-delivery
mkdir backend
cd backend
npm init -y
```

### 2. Install Dependencies

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install -D nodemon
```

### 3. Create Folder Structure

```bash
mkdir -p src/{models,routes,controllers,middleware,config,utils}
touch src/server.js
touch .env
```

### 4. Update `package.json`

```json
{
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

### 5. Environment Variables

Create `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-delivery
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

---

## File Templates

### Frontend - `src/App.jsx`

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Frontend - `src/pages/HomePage.jsx`

```jsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Hello Delivery 🚀
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to Vibe Delivery - Fast, Reliable Parcel Delivery
        </p>
        <div className="space-x-4">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-outline">Learn More</button>
        </div>
      </div>
    </div>
  );
}
```

### Backend - `src/server.js`

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Vibe Delivery API!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
```

### Backend - `src/config/database.js`

```javascript
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};
```

---

## Running the Application

### Terminal 1 - Backend

```bash
cd vibe-delivery/backend
npm run dev
```

Expected output:
```
✅ Server running on http://localhost:5000
✅ MongoDB connected
```

### Terminal 2 - Frontend

```bash
cd vibe-delivery/frontend
npm start
```

The app will open at `http://localhost:3000` showing "Hello Delivery" 🎉

---

## Frontend Component Examples

### `src/components/Navbar.jsx`

```jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-primary text-white">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          🚚 Vibe Delivery
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/login" className="btn btn-outline">
          Login
        </Link>
      </div>
    </div>
  );
}
```

### `src/components/Card.jsx`

```jsx
export default function Card({ icon, title, description }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
```

---

## Backend Route Examples

### `src/routes/authRoutes.js`

```javascript
import express from 'express';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  // Login logic here
  res.json({ message: 'Login endpoint' });
});

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  // Signup logic here
  res.json({ message: 'Signup endpoint' });
});

export default router;
```

---

## Next Steps

1. ✅ Create the project structure
2. ✅ Install all dependencies
3. ✅ Set up frontend and backend
4. ✅ See "Hello Delivery" message
5. ⏭️ Create User model and Authentication
6. ⏭️ Build Customer Dashboard
7. ⏭️ Build Driver Dashboard
8. ⏭️ Build Admin Dashboard

---

## Useful Commands

### Frontend
```bash
npm start          # Start dev server
npm build          # Build for production
npm test           # Run tests
```

### Backend
```bash
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start production
```

---

## daisyUI Components to Use

- **Button**: `btn btn-primary`, `btn btn-outline`, etc.
- **Card**: `card bg-base-100 shadow-xl`
- **Input**: `input input-bordered w-full`
- **Navbar**: `navbar bg-primary`
- **Modal**: `modal modal-open`
- **Alert**: `alert alert-success`, `alert alert-error`
- **Badge**: `badge badge-primary`
- **Table**: `table w-full`
- **Form**: `form-control`
- **Dropdown**: `dropdown`

---

## Environment Variables

### Frontend (`.env.local`)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Vibe Delivery
```

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-delivery
JWT_SECRET=your_secret_key_12345
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

---

## Database Models to Create

1. **User** - Authentication and profile
2. **Customer** - Customer-specific data
3. **Driver** - Driver-specific data
4. **Parcel** - Parcel/shipment data
5. **Delivery** - Delivery assignments
6. **Address** - Customer addresses
7. **Payment** - Transaction records
8. **Review** - Customer reviews

---

## Folder-by-Folder Breakdown

### Frontend

**components/** - Reusable React components
- Navbar.jsx
- Card.jsx
- Button.jsx
- Modal.jsx
- etc.

**pages/** - Full page components
- HomePage.jsx
- LoginPage.jsx
- DashboardPage.jsx
- NotFoundPage.jsx

**routes/** - Route configuration
- routes.jsx

**services/** - API service functions
- api.js
- authService.js
- parcelService.js

**stores/** - Zustand store definitions
- useAuthStore.js
- useUserStore.js
- useDeliveryStore.js

**utils/** - Helper functions
- validators.js
- formatters.js
- constants.js

### Backend

**models/** - Mongoose schemas
- User.js
- Parcel.js
- Delivery.js

**routes/** - Express routes
- authRoutes.js
- parcelRoutes.js
- deliveryRoutes.js

**controllers/** - Route handlers
- authController.js
- parcelController.js
- deliveryController.js

**middleware/** - Custom middleware
- authMiddleware.js
- errorHandler.js
- validation.js

**config/** - Configuration
- database.js
- constants.js

**utils/** - Helper functions
- jwt.js
- password.js
- errors.js

---

## Quick Start Command

For Mac/Linux:
```bash
# Clone or create project
cd vibe-delivery

# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm start
```

---

## Expected Result

When everything is set up correctly:
- Frontend runs at `http://localhost:3000` ✅
- Backend API runs at `http://localhost:5000` ✅
- "Hello Delivery" appears on the home page ✅
- Console shows successful database connection ✅
