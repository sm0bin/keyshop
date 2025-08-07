import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { CircleUserRound, ShoppingBasket } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectUser } from "@/redux/features/auth/authSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { Link as CustomLink } from "@/components/ui/link";
import { Button } from "../ui/button";
type Checked = DropdownMenuCheckboxItemProps["checked"];

const Header = () => {
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [navbarStyle, setNavbarStyle] = React.useState("translate-y-0");
  const user = useAppSelector(selectUser);
  const isLoggedIn = user && Object.keys(user).length > 0;
  const {
    data,
    isLoading: isCartLoading,
    error: cartError,
  } = useGetCartQuery(undefined);
  // RTK Query hook to fetch profile data
  const { data: profile, isLoading: isProfileLoading } =
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
