import App from "@/App";
import UserLayout from "@/layout/UserLayout";
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
        path: "/about",
        element: <AboutUs />,
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
        path: "/user",
        element: (
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              {
                path: "products",
                element: <ProductsTable />,
              },
              {
                path: "add-products",
                element: <AddProduct />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
