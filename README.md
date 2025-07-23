# 🛍️ FOREVER – Full Stack E-Commerce Website

**FOREVER** is a fully functional, full-stack e-commerce platform built using **React.js (Vite)** for both the customer-facing website and the admin dashboard, **Node.js + Express** for the backend RESTful APIs, and **MongoDB** for seamless data storage and retrieval. The project features real-time inventory management, user authentication (JWT-based), role-based admin access, and secure **Razorpay payment gateway** integration for online transactions. The application is optimized for performance using Vite, supports clean code architecture, and is deployed with **Render** (backend) and **Vercel** (frontend & admin). Designed with scalability and maintainability in mind, FOREVER offers a complete modern shopping experience from browsing to checkout for users, while giving administrators full control over products, orders, and users via a clean admin interface.
. The platform features user-friendly product browsing, secure checkout with **Razorpay payment integration**, and an admin dashboard to manage inventory and orders.

---

## 🚀 Live Demo

- 🌐 **Customer Website**: [https://e-commerce-beryl-zeta-42.vercel.app/](https://e-commerce-beryl-zeta-42.vercel.app/)
- 🔐 **Admin Dashboard**: [https://e-commerce-admin-ten-beta.vercel.app/](https://e-commerce-admin-ten-beta.vercel.app/)

---

## ✨ Features

### 🛍️ Customer Side
- Product listing with filters and sorting
- Product detail pages
- Add to Cart & Checkout
- Razorpay integrated secure payments
- Order summary after purchase
- Fully responsive UI for mobile and desktop

### 🛠️ Admin Dashboard
- Admin authentication
- Add / Edit / Delete Products
- View customer orders
- Dashboard overview with product & order stats
- Mobile-friendly interface

### ⚙️ Backend (API Server)
- RESTful API with Express.js
- MongoDB with Mongoose ODM
- JSON Web Token (JWT) based authentication
- Razorpay Payment Order creation
- CORS configured for cross-origin frontend/backend access

---

## 🧱 Project Structure

- `frontend/` – Customer-facing website (React + Vite)
- `admin/` – Admin dashboard (React + Vite)
- `backend/` – Node.js + Express REST API
