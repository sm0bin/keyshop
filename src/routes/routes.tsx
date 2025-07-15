import App from "@/App";
import AboutUs from "@/pages/about/AboutUs";
import ContactUs from "@/pages/contact/ContactUs";
import Home from "@/pages/home/Home";
import Login from "@/pages/Login";
import Products from "@/pages/products/Products";
import { createBrowserRouter } from "react-router-dom";

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
        path: "/dashboard",
        element: <div>Dashboard</div>,
      },
    ],
  },
]);

export default router;
