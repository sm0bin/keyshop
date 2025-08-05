import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { CircleUserRound, ShoppingBasket } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectUser } from "@/redux/features/auth/authSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApi";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { Link as CustomLink } from "@/components/ui/link";
type Checked = DropdownMenuCheckboxItemProps["checked"];

const Header = () => {
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [navbarStyle, setNavbarStyle] = React.useState("translate-y-0");
  const user = useAppSelector(selectUser);
  const isLoggedIn = user && Object.keys(user).length > 0;
  const {
    data,
    isLoading: cartLoading,
    error: cartError,
  } = useGetCartQuery(undefined);
  // RTK Query hook to fetch profile data
  const { data: profile, isLoading: profileLoading } =
    useGetProfileQuery(undefined);

  const profileData = profile?.data || null;
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const dispatch = useAppDispatch();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
    // { label: "Dashboard", path: `/dashboard` },
  ];

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
      className={`py-4 px-6 flex items-center justify-between ${navbarStyle} transition-transform duration-300 ease-in-out fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border border-white/10  shadow-lg hover:transition`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link className="text-2xl font-bold text-white rounded-md" to="/">
          MechaKeys
        </Link>
      </div>

      {/* Navigation links */}
      <div className="flex items-center gap-1 font-medium text-lg text-white">
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
      <div className="flex items-center gap-6 text-white">
        <Link to="/cart" className="relative">
          <ShoppingBasket size={32} strokeWidth="1" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
            {cartLoading ? "0" : data?.data?.totalItems || 0}
          </span>
        </Link>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <CircleUserRound size={32} strokeWidth="1" />
                {profileLoading ? "Loading..." : profileData?.name}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                {`${profileData?.name} (${profileData?.role})`}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                {profileData?.email}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
                onClick={() => dispatch(logout())}
              >
                Logout
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // <Link className="flex gap-2 items-center" to="/account">
          //   <CircleUserRound size={32} strokeWidth="1" />
          //   {user.role}
          // </Link>
          <CustomLink to="/login">Login</CustomLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
