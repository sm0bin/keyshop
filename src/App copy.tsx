import Header from "./components/layout/Header";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layout/Sidebar";
import { Menu } from "lucide-react";

function App({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNavbarRoutes = ["/test"];

  const showNavbar = !hideNavbarRoutes.some((path) =>
    location.pathname.includes(path)
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black w-full min-h-svh">
      {showNavbar && <Header />}
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="z-50" />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default App;
