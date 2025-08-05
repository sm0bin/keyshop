import App from "@/App";
import AboutUs from "@/pages/about/AboutUs";
import Cart from "@/pages/cart/Cart";
import ContactUs from "@/pages/contact/ContactUs";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import Products from "@/pages/products/Products";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "@/pages/auth/Signup";
import ProductsTable from "@/pages/dashboard/components/ProductsTable";
import AddProduct from "@/pages/dashboard/components/AddProduct";
import ProductDetails from "@/pages/productDetails/ProductDetails";
import Checkout from "@/pages/checkout/Checkout";
import Return from "@/pages/stripe/Return";
import CheckoutForm from "@/pages/stripe/CheckoutForm";
import Success from "@/pages/stripe/Success";
import Cancel from "@/pages/stripe/Cancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancel",
        element: <Cancel />,
      },

      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout-form",
        element: (
          <ProtectedRoute>
            <CheckoutForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/return",
        element: (
          <ProtectedRoute>
            <Return />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <ProductsTable />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-products",
            element: (
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
