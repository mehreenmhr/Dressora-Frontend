# Dressora - Premium Online Fashion Store (Frontend)

A modern, responsive React-based e-commerce frontend for Dressora, a premium online fashion store featuring diverse fashion categories.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![React Router](https://img.shields.io/badge/React_Router-6.20.0-blue)
![License](https://img.shields.io/badge/License-ISC-green)

## 🎯 Overview

Dressora Frontend is a full-featured e-commerce platform built with React and Create React App. It showcases three main fashion categories: **Modest**, **Eastern**, and **Western** wear, providing customers with a seamless shopping experience.

## ✨ Features

- **Responsive Design** - Mobile-first approach with modern CSS Grid and Flexbox
- **Multiple Categories** - Modest, Eastern, and Western fashion collections
- **Product Showcase** - Featured products, new arrivals, and category browsing
- **Shopping Cart** - Add/remove items with real-time updates
- **User Authentication** - Sign up, login, and customer profiles
- **Order Management** - Track orders and view order history
- **Admin Dashboard** - Manage products, categories, and orders
- **Seller Portal** - Upload and manage products
- **Responsive Navigation** - Smooth navigation with React Router
- **Modern UI Components** - Lucide React icons throughout

## 🛠️ Technology Stack

- **Framework**: React 18.2.0
- **Routing**: React Router DOM 6.20.0
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Styling**: CSS3 with CSS Variables
- **Icons**: Lucide React
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## 🚀 Getting Started

### 1. Installation

Clone the repository:
```bash
git clone https://github.com/yjaveria3-netizen/Dressora-Frontend.git
cd Dressora-Frontend
```

Install dependencies:
```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory (use `.env.example` as reference):
```bash
REACT_APP_NAME=Dressora
REACT_APP_VERSION=1.0.0
BROWSER=none
```

### 3. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Navigation component
│   │   └── Footer.jsx          # Footer component
│   ├── shared/
│   │   ├── FeatureBar.jsx      # Features showcase
│   │   └── SectionHeader.jsx   # Section headers
│   └── ui/
│       ├── Badge.jsx           # Badge component
│       ├── Button.jsx          # Reusable button
│       ├── CategoryCard.jsx    # Category cards
│       ├── ProductCard.jsx     # Product cards
│       └── ReviewCard.jsx      # Review cards
├── pages/
│   ├── Home.jsx                # Home/landing page
│   ├── Shop.jsx                # Shop/products page
│   ├── ProductDetail.jsx       # Individual product page
│   ├── Cart.jsx                # Shopping cart
│   ├── Checkout.jsx            # Checkout process
│   ├── OrderConfirmation.jsx   # Order confirmation
│   ├── admin/
│   │   └── AdminPages.jsx      # Admin dashboard
│   ├── seller/
│   │   └── SellerPages.jsx     # Seller dashboard
│   ├── customer/
│   │   └── CustomerPages.jsx   # Customer dashboard
│   └── auth/
│       ├── Login.jsx           # Login page
│       └── Register.jsx        # Registration page
├── context/
│   ├── AuthContext.jsx         # Authentication context
│   └── CartContext.jsx         # Cart management
├── data/
│   └── mockData.js             # Mock database & data
├── routes/
│   └── AppRoutes.jsx           # Route configuration
├── styles/
│   ├── index.css               # Global styles
│   ├── navbar.css              # Navbar styles
│   ├── home.css                # Home page styles
│   ├── shop.css                # Shop page styles
│   ├── cart.css                # Cart styles
│   ├── checkout.css            # Checkout styles
│   ├── auth.css                # Auth pages styles
│   ├── dashboard.css           # Dashboard styles
│   ├── components.css          # Component styles
│   └── pages.css               # Page-specific styles
├── App.jsx                     # Root component
├── index.js                    # Entry point
└── main.jsx                    # React DOM render
```

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (port 3000) |
| `npm build` | Create production build |
| `npm test` | Run test suite |
| `npm eject` | Expose Create React App config (⚠️ irreversible) |

## 🏪 Categories

### Main Categories

1. **Modest Fashion** 👗
   - Abayas
   - Hijabs

2. **Eastern Wear** 🥻
   - Saris
   - Lehengas

3. **Western Fashion** 👔
   - Dresses
   - Tops

## 🎨 Design System

### Color Palette
- **Primary Gradient**: `#f92c8b` → `#b02cd6` (Pink to Purple)
- **Background**: `#ffffff` (White)
- **Text Primary**: `#1a1a2e` (Dark)
- **Text Secondary**: `#555770` (Medium)
- **Borders**: `#e8e8f0` (Light)

### Typography
- **Headings**: Arima Madurai (Creative, flowing curves)
- **Body**: Mulish (Minimalist, clean readability)

### Spacing & Sizing
- **Container**: 1200px max-width
- **Border Radius**: 4px (sm), 12px (md), 20px (lg)
- **Navbar Height**: 72px
- **Transitions**: 250ms ease

## 🔑 Key Features

### Authentication System
- User registration with email validation
- Secure login with session management
- Role-based access (Customer, Seller, Admin)
- User profile management

### Shopping Experience
- Product filtering by category
- Product search functionality
- Add to cart with quantity selection
- Real-time cart updates
- Multiple shipping addresses
- Secure checkout process

### Order Management
- Order placement and confirmation
- Order tracking with status updates
- Order history and details
- Invoice generation

### Admin Features
- Dashboard with analytics
- Product management (CRUD)
- Order monitoring
- User management
- Coupon management

### Seller Features
- Store management
- Product listings
- Sales analytics
- Order fulfillment

## 📦 Mock Data

The application uses mock data from `src/data/mockData.js` with:
- 12 sample products
- 3 main categories with 6 subcategories
- 5 user profiles
- Multiple addresses and orders
- Customer reviews and ratings
- Coupon codes

## 🔧 Configuration

### Environment Variables
```
REACT_APP_NAME         - Application name
REACT_APP_VERSION      - App version
BROWSER                - Browser auto-open setting (none to disable)
```

### CSS Variables
Located in `src/styles/index.css`:
- Color variables (--pink, --purple, --text-primary, etc.)
- Spacing variables (--radius-sm, --radius-md, etc.)
- Shadow variables (--shadow-sm, --shadow-md, etc.)
- Typography variables (--font-body, --font-heading)

## 📱 Responsive Breakpoints

- **Desktop**: > 1100px (Full layout)
- **Tablet**: 900px - 1100px (4-3 column adjustments)
- **Mobile**: < 900px (2 column layout)
- **Small Mobile**: < 640px (1-2 column layout)

## 🎯 Routing Structure

| Route | Component | Auth Required |
|-------|-----------|---|
| `/` | Home | ❌ |
| `/shop` | Shop | ❌ |
| `/product/:id` | ProductDetail | ❌ |
| `/cart` | Cart | ❌ |
| `/checkout` | Checkout | ✅ |
| `/order-confirmation` | OrderConfirmation | ✅ |
| `/login` | Login | ❌ |
| `/register` | Register | ❌ |
| `/customer` | CustomerDashboard | ✅ |
| `/seller` | SellerDashboard | ✅ Seller |
| `/admin` | AdminDashboard | ✅ Admin |

## 🚀 Performance Optimization

- CSS-in-JS with CSS Variables for efficient styling
- Lazy loading of route components (with React Router)
- Responsive images with proper aspect ratios
- Optimized bundle size with Create React App

## 📝 Coding Standards

- **Component Structure**: Functional components with hooks
- **State Management**: React Context API for global state
- **Styling**: Component-scoped CSS with global variables
- **Naming Conventions**: camelCase for variables/functions, PascalCase for components

## 🐛 Known Issues & Warnings

- ESLint warnings for unused imports (cosmetic, non-functional)
- Deprecated Webpack dev server middleware warnings (non-critical)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💼 Author

**Yjaveria**
- GitHub: [@yjaveria3-netizen](https://github.com/yjaveria3-netizen)
- Repository: [Dressora-Frontend](https://github.com/yjaveria3-netizen/Dressora-Frontend)

## 📞 Support

For issues and questions:
- Create an issue on [GitHub Issues](https://github.com/yjaveria3-netizen/Dressora-Frontend/issues)
- Check existing documentation and FAQs

## 🗓️ Version History

### v1.0.0 (May 11, 2026)
- Initial release
- 3 main categories: Modest, Eastern, Western
- Complete e-commerce functionality
- Multi-role user system
- Responsive design
- Updated typography: Arima Madurai & Mulish fonts
- Enhanced mobile responsiveness for admin/seller panels
- Removed catalog management from admin panel
- Improved login/register layout with swapped sides
- Fixed image display issues throughout application

## 🔮 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Real-time notifications
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Advanced filtering and search
- [ ] User recommendations engine
- [ ] Mobile app (React Native)
- [ ] GraphQL API integration

---

**Made with ❤️ by the Dressora team**
