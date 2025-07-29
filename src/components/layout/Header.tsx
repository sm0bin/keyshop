import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { CircleUserRound, ShoppingBasket } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, selectUser } from "@/redux/features/auth/authSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Header = () => {
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [navbarStyle, setNavbarStyle] = React.useState("translate-y-0");
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  const user = useAppSelector(selectUser);
  const isLoggedIn = user && Object.keys(user).length > 0;
  const { data, isLoading, error, isError, refetch } =
    useGetCartQuery(undefined);
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);
  const dispatch = useAppDispatch();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
    { label: "Dashboard", path: `/${user?.role}/dashboard` },
  ];

  React.useEffect(() => {
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
      <div className="flex items-center">
        <Link className="text-2xl font-bold text-white rounded-md" to="/">
          MechaKeys
        </Link>
      </div>
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
      </div>

      <div className="flex items-center gap-6 text-white">
        <Link to="/cart" className="relative">
          <ShoppingBasket size={32} strokeWidth="1" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
            {/* Replace with actual cart item count */}
            {isLoading ? "0" : data?.data?.totalItems || 0}
            {/* {totalItems > 0 ? totalItems : 0} */}
          </span>
        </Link>
        {/* <Link to="/help">
          <CircleHelpIcon />
        </Link> */}

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <CircleUserRound size={32} strokeWidth="1" />
                {user.role}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                {user.id}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
                disabled
              >
                Activity Bar
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
          <Link
            className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/25 text-white backdrop-blur-md hover:bg-white/35 transition shadow-lg shadow-white/10 font-semibold"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

// function ListItem({
//   title,
//   children,
//   to,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { to: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link to={to}>
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }

export default Header;
