<a name="readme-top"></a>

# 🖥️ Dressora Frontend Architecture

The frontend of Dressora is a modern React-based Single Page Application (SPA) designed to deliver a premium, high-speed user experience for luxury fashion shoppers.

## 🛠 Built With

* **React (v18)**
* **React Router DOM** (Client-side routing)
* **Lucide React** (Consistent, beautiful iconography)
* **Vanilla CSS** (Custom luxury design system)

## ✨ Core Features

* **Component-Driven Design**: Highly reusable UI components like `ProductCard`, ensuring consistency across the platform.
* **Context API State Management**: Utilizing `CartContext` and `AuthContext` to manage global state without heavy external libraries.
* **Asynchronous API Integration**: A dedicated `services/api.js` layer cleanly separating data-fetching logic from UI components.
* **Dynamic Routing**: Role-based access and dynamic URL parameter parsing for product categories and details.
* **Live Dashboards**: Real-time User and Product management for Admin and Seller roles.

## 📁 Directory Structure

```text
frontend/src/
├── components/      # UI elements (Cards, Buttons, Layouts)
├── context/         # React Context Providers (Cart, Auth)
├── data/            # Mock data helpers and formatting utilities
├── pages/           # Route-level components
│   ├── admin/       # Live Admin Dashboard and User management
│   ├── auth/        # Login and Registration flows
│   ├── Home.jsx     # Landing page (connected to API)
│   ├── Shop.jsx     # Main product catalog (dynamic filtering)
│   └── ProductDetail.jsx
├── services/        # API communication (fetch layer)
└── styles/          # Luxury CSS design system
```

## 🚀 Running the Frontend

The frontend is configured to proxy API requests to `http://localhost:5000` to prevent CORS issues during local development.

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## 🎨 Design System

The application utilizes a custom CSS architecture (`styles/index.css`) that defines a strict set of CSS variables (`--pink`, `--text-primary`, etc.) ensuring the luxury aesthetic is maintained across all 26+ pages.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
