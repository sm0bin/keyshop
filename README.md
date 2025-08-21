# Mechanical Keyboard Shop (Frontend)

## Introduction

The frontend of the **Mechanical Keyboard Shop** is a modern and responsive single-page application (SPA) built with React, Redux, and TypeScript. It provides an intuitive shopping experience for mechanical keyboard enthusiasts with features like product browsing, filtering, cart management, and checkout.

## Project Description

The client-side application is designed to deliver a seamless e-commerce experience. It allows users to explore mechanical keyboards, view detailed product information, manage carts, and place orders. It integrates with the backend via REST APIs to fetch and update data dynamically.

## Features

- Responsive and modern UI/UX with smooth navigation.
- Homepage with featured products, hero banner, brand highlights, and testimonials.
- Products page with **search, filtering, and sorting** functionality.
- Product details page with full information and **add-to-cart** system.
- Dynamic shopping cart with **quantity management** and price calculation.
- Checkout page supporting **Cash on Delivery** and optional **Stripe integration**.
- Admin dashboard with **product management (create, update, delete)**.
- Debounce search functionality to reduce API load.
- Page refresh warning when the cart is not empty.
- Micro animations and responsive design for mobile and desktop.

## Technology Stack

- **React (Vite + TypeScript)**
- **Redux Toolkit & RTK Query**
- **React Router DOM**
- **Tailwind CSS** (UI styling)
- **shadcn** (UI components)
- **Axios** (API requests)
- **Stripe**

## Installation Guideline

### Prerequisites

- Node.js (>=18)
- npm or yarn

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/sm0bin/keyshop.git
   cd keyshop
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

### Configuration

Create a `.env` file in the root directory:

```bash
VITE_BASE_URL=http://localhost:5000/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=XXXX
```

## Usage

1. Run the development server using `npm run dev`.
2. Open the app in your browser at `http://localhost:5173`.
3. Browse products, add to cart, and place an order.
4. Admins can manage products via the **Dashboard**.

---

## Live Deployment 🌐

[Client App](https://keyshop-gilt.vercel.app/)

## GitHub Repository 📂

[Frontend Repository](https://github.com/sm0bin/keyshop)
