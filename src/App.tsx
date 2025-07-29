import Header from "./components/layout/Header";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/dashboard"];

  const showNavbar = !hideNavbarRoutes.some((path) =>
    location.pathname.includes(path)
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black w-full min-h-svh">
      {showNavbar && <Header />}
      <Outlet />
    </div>
  );
}

export default App;
