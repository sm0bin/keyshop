import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { CircleUserRound, ShoppingBasket } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Dashboard", path: "/dashboard" },
];

const Header = () => {
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [navbarStyle, setNavbarStyle] = React.useState("translate-y-0");

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
        <Link to="/cart">
          <ShoppingBasket size={32} strokeWidth="1" />
        </Link>
        {/* <Link to="/help">
          <CircleHelpIcon />
        </Link> */}
        <Link to="/account">
          <CircleUserRound size={32} strokeWidth="1" />
        </Link>
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
