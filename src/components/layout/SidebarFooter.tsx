import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/features/auth/authSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApi";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link as CustomLink } from "@/components/ui/link";
import {
  ChevronUp,
  CircleUserRound,
  ShoppingBasket,
  User2,
} from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";

interface SidebarFooterProps {
  isLoggedIn: boolean;
}

const SidebarFooter = ({ isLoggedIn }: SidebarFooterProps) => {
  const dispatch = useAppDispatch();
  const { data, isLoading: isCartLoading } = useGetCartQuery(undefined);
  const { data: profile, isLoading: isProfileLoading } =
    useGetProfileQuery(undefined);
  const profileData = profile?.data || null;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 p-4 border-t border-white/10 ">
      {isLoggedIn && (
        // <Link
        //   to="/cart"
        //   className="relative flex items-center gap-3 text-white hover:bg-white/10 p-2 rounded-lg"
        // >
        //   <ShoppingBasket size={24} strokeWidth="1" />
        //   <span>Cart</span>
        //   <span className="ml-auto bg-orange-500 text-white text-xs font-semibold rounded-full px-1.5">
        //     {isCartLoading ? "-" : data?.data?.totalItems || 0}
        //   </span>
        // </Link>
        <SidebarMenuButton
          onClick={() => {
            navigate("/cart");
          }}
        >
          <ShoppingBasket />
          <span>Cart</span>
          <span className="ml-auto bg-orange-500 text-white text-xs font-semibold rounded-full px-1.5">
            {isCartLoading ? "-" : data?.data?.totalItems || 0}
          </span>
        </SidebarMenuButton>
      )}

      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <div className="flex items-center gap-3 cursor-pointer text-white hover:bg-white/10 p-2 rounded-lg">
              <CircleUserRound size={24} strokeWidth="1" />
              <span>{isProfileLoading ? "Loading..." : profileData?.name}</span>
            </div> */}
            <SidebarMenuButton>
              <User2 />
              <span>
                {isProfileLoading
                  ? "Loading..."
                  : profileData?.name.split(" ")[0] || "User"}
              </span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-white/20 border border-white/10 backdrop-blur-md text-white"
            align="end"
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
        <CustomLink to="/login" className="flex items-center gap-3 p-2">
          <CircleUserRound size={24} strokeWidth="1" />
          <span>Login</span>
        </CustomLink>
      )}
    </div>
  );
};

export default SidebarFooter;
