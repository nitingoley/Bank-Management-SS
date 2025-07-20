# Bank Management System🏦

![BankInfoManager Banner](./assets/banner.png) <!-- Add your own banner image -->

A modern full-stack banking management system with secure authentication, real-time data visualization, and comprehensive account management.

## ✨ Key Features

| Feature Category       | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| **User Experience**     | Intuitive dashboard with all accounts overview and quick actions            |
| **Admin Capabilities**  | Full CRUD operations, advanced search, and bulk account management          |
| **Security**           | JWT authentication, role-based access control, and encrypted data storage  |
| **Data Visualization** | Interactive charts (bar, pie, line, doughnut) with real-time updates       |
| **Accessibility**      | WCAG compliant design with keyboard navigation and screen reader support   |

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?logo=vite)
![MaterialUI](https://img.shields.io/badge/Material%20UI-5.0-007FFF?logo=mui)
![Chart.js](https://img.shields.io/badge/Chart.js-4.0-FF6384?logo=chartdotjs)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18.0-339933?logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens)

## 📂 Project Structure

```bash
BankInfoManager/
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   └── src/
│       ├── assets/         # Images, icons
│       ├── components/     # Reusable UI
│       ├── features/       # Feature modules
│       ├── store/          # Zustand state
│       └── styles/         # Global styles
└── server/                # Express Backend
    ├── config/            # DB config
    ├── controllers/       # Route logic
    ├── middleware/        # Auth handlers
    ├── models/            # Mongoose schemas
    └── routes/            # API endpoints