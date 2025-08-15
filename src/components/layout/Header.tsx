import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectUser } from "@/redux/features/auth/authSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { Link as CustomLink } from "@/components/ui/link";
import {
  CircleUserRound,
  ShoppingBasket,
  Home,
  Package,
  Info,
  MessageSquare,
} from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

const navLinks = [
  { label: "Home", path: "/", icon: Home },
  { label: "Products", path: "/products", icon: Package },
  { label: "About Us", path: "/about", icon: Info },
  { label: "Contact Us", path: "/contact", icon: MessageSquare },
];

const Header = () => {
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [navbarStyle, setNavbarStyle] = React.useState("translate-y-0");
  const user = useAppSelector(selectUser);
  const isLoggedIn = user && Object.keys(user).length > 0;
  const { data, isLoading: isCartLoading } = useGetCartQuery(undefined);
  const { data: profile, isLoading: isProfileLoading } =
    useGetProfileQuery(undefined);

  const profileData = profile?.data || null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setNavbarStyle("-translate-y-full"); // Hide navbar on scroll down
      } else {
        setNavbarStyle("translate-y-0"); // Show navbar on scroll up
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <nav
      className={`py-4 px-2 md:px-6 flex items-center  gap-6 md:justify-between ${navbarStyle} transition-transform duration-300 ease-in-out fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border border-white/10  shadow-lg hover:transition `}
    >
      <SidebarTrigger className="text-white md:hidden" />
      {/* Logo */}
      <Link
        className="text-xl md:text-2xl font-bold text-white rounded-md"
        to="/"
      >
        MechaKeys
      </Link>
      {/* Navigation links */}
      <div className="hidden md:flex flex-col md:flex-row items-center gap-1 font-medium text-base md:text-lg text-white">
        {navLinks.map((link) => (
          <NavLink
            className="px-3 py-1 rounded-md hover:bg-white/10"
            key={link.label}
            to={link.path}
          >
            {link.label}
          </NavLink>
        ))}

        {user?.role === "admin" && (
          <NavLink
            className="px-3 py-1 rounded-md hover:bg-white/10"
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        )}
      </div>

      {/* Cart and Profile */}
      <div className="hidden md:flex items-center gap-6 text-white">
        {isLoggedIn && (
          <Link to="/cart" className="relative">
            <ShoppingBasket size={32} strokeWidth="1" />
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-semibold rounded-full px-1.5">
              {isCartLoading ? "-" : data?.data?.totalItems || 0}
            </span>
          </Link>
        )}

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <CircleUserRound size={32} strokeWidth="1" />
                <span>
                  {isProfileLoading ? "Loading..." : profileData?.name}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white/20 border border-white/10 backdrop-blur-md text-white"
              align="start"
            >
              {isProfileLoading || !profileData || (
                <>
                  <DropdownMenuLabel>
                    {profileData?.name} ({profileData?.role})
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="opacity-20" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>{profileData?.email}</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="opacity-20" />
                </>
              )}
              <DropdownMenuItem onClick={() => dispatch(logout())}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <CustomLink to="/login">Login</CustomLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
