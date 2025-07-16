import { useState } from "react";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Heart,
  Settings,
  RefreshCw,
  LogOut,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  User,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  // RTK Query hook to fetch profile data
  const { data, isLoading, error, refetch } = useGetProfileQuery(undefined);

  const profile = data?.data || null;
  // Mock profile data for demonstration
  //   const profile = {
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     role: "Admin",
  //     avatar: null,
  //     lastLogin: new Date().toISOString(),
  //   };

  //   const isLoading = false;
  //   const error = null;

  const handleLogout = () => {
    dispatch(logout());
    // console.log("Logging out...");
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  //   const refetch = () => {
  //     console.log("Refetching profile...");
  //   };

  // Navigation items with Lucide icons
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
    },
    { id: "products", label: "Products", icon: Package, href: "/products" },
    { id: "orders", label: "Orders", icon: ShoppingCart, href: "/orders" },
    { id: "wishlist", label: "Wishlist", icon: Heart, href: "/wishlist" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div
      className={`backdrop-blur-xl bg-white/20 border-r border-white/30 shadow-2xl transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      } h-screen fixed left-0 top-0 z-40`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            {isExpanded && (
              <span className="ml-3 text-gray-100 font-semibold text-lg">
                App Name
              </span>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-white/20">
          {isLoading ? (
            <div className="flex items-center justify-center">
              {isExpanded ? (
                <div className="animate-pulse">
                  <div className="w-12 h-12 bg-white/30 rounded-full mb-2"></div>
                  <div className="h-4 bg-white/30 rounded w-20 mb-1"></div>
                  <div className="h-3 bg-white/30 rounded w-16"></div>
                </div>
              ) : (
                <div className="w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
              )}
            </div>
          ) : error ? (
            <div className="text-center">
              {isExpanded ? (
                <div>
                  <div className="text-red-500 mb-2">
                    <AlertTriangle className="w-6 h-6 mx-auto" />
                  </div>
                  <p className="text-xs text-red-600 mb-2">
                    Failed to load profile
                  </p>
                  <button
                    onClick={() => refetch()}
                    className="text-xs bg-red-100/80 text-red-700 px-2 py-1 rounded hover:bg-red-200/80 transition-colors backdrop-blur-sm"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div
                  className="text-red-500 cursor-pointer"
                  onClick={() => refetch()}
                >
                  <AlertTriangle className="w-5 h-5 mx-auto" />
                </div>
              )}
            </div>
          ) : profile ? (
            <div className="text-center">
              <div className="relative inline-block">
                <div
                  className={`${
                    isExpanded ? "w-12 h-12" : "w-8 h-8"
                  } rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center transition-all duration-300`}
                >
                  <User
                    className={`${
                      isExpanded ? "w-6 h-6" : "w-4 h-4"
                    } text-white`}
                  />
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white ${
                    isExpanded ? "block" : "hidden"
                  }`}
                ></div>
              </div>

              {isExpanded && (
                <div className="mt-2">
                  <p className="font-semibold text-gray-100 text-sm truncate">
                    {profile.name}
                  </p>
                  <p className="text-xs text-gray-300 truncate">
                    {profile.email}
                  </p>
                  {profile.role && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100/80 text-blue-800 rounded-full backdrop-blur-sm">
                      {profile.role}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center p-3 text-gray-200 hover:bg-white/30 rounded-lg transition-all duration-200 group relative ${
                  !isExpanded ? "justify-center" : ""
                } hover:shadow-lg hover:scale-105`}
              >
                <IconComponent className="w-5 h-5" />
                {isExpanded && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
                {!isExpanded && (
                  <div className="absolute left-16 bg-gray-800/90 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 backdrop-blur-sm">
                    {item.label}
                  </div>
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/20">
          {isExpanded && profile && (
            <div className="mb-3 text-xs text-gray-500">
              <p>
                Last login: {new Date(profile.lastLogin).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <button
              onClick={() => refetch()}
              className={`w-full flex items-center p-3 text-gray-300 hover:text-gray-100 hover:bg-white/30 rounded-lg transition-all duration-200 hover:scale-105 ${
                !isExpanded ? "justify-center" : ""
              }`}
              title="Refresh Profile"
            >
              <RefreshCw className="w-5 h-5" />
              {isExpanded && <span className="ml-3 text-sm">Refresh</span>}
            </button>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center p-3 text-red-600 hover:text-red-800 hover:bg-red-50/30 rounded-lg transition-all duration-200 hover:scale-105 ${
                !isExpanded ? "justify-center" : ""
              }`}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              {isExpanded && <span className="ml-3 text-sm">Logout</span>}
            </button>
          </div>

          {/* Collapse Arrow */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <button
              onClick={toggleSidebar}
              className="w-full flex items-center justify-center p-2 text-gray-300 hover:text-gray-100 hover:bg-white/30 rounded-lg transition-all duration-200 hover:scale-105"
              title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isExpanded ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
