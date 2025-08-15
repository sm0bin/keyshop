import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarFooter from "./SidebarFooter";
import {
  Home,
  Package,
  Info,
  MessageSquare,
  ShoppingBasket,
  LayoutList,
} from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { selectUser } from "@/redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "Products", path: "/products", icon: Package },
  { label: "About Us", path: "/about", icon: Info },
  { label: "Contact Us", path: "/contact", icon: MessageSquare },
];

export function AppSidebar() {
  const user = useAppSelector(selectUser);
  const isLoggedIn = user && Object.keys(user).length > 0;

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-bold">MechaKeys</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <Link to={item.path}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {user?.role === "admin" && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/dashboard">
                  <LayoutList />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          {isLoggedIn && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/cart">
                  <ShoppingBasket />
                  <span>Cart</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter isLoggedIn={!!isLoggedIn} />
    </Sidebar>
  );
}
