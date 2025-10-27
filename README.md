
---

## ⚙️ Tech Stack
- **Frontend:** React, Vite, Axios, Stripe
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary
- **Admin Panel:** React + Vite + Axios
- **Payments:** Stripe Integration

---

## 🚀 Getting Started

### 1️⃣ Clone this repository
```bash
git clone https://github.com/HassanShahidDev/ecomerce-website.git
cd ecomerce-website

                  Backend
cd backend
npm install
                 Frontend
cd ../frontend
npm install
                Admin Panel
cd ../admin
npm install
       Setup Environment Variables
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
Deployment Guide
🔹 Backend (Render)

Go to Render.com

Click New → Web Service

Connect your GitHub repo

Select backend/ folder as root

Add Environment Variables (same as .env)

Build Command:
Frontend (Vercel)

Go to Vercel.com

Click Add New → Project

Connect the same GitHub repo

Select frontend/ folder

Framework: Vite

Add environment variable:


