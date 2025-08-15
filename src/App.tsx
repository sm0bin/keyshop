import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

export default function App() {
  return (
    <SidebarProvider
      defaultOpen={false}
      // className="bg-gradient-to-br from-gray-900 via-gray-800 to-black w-full min-h-svh"
    >
      <AppSidebar />
      <main className="w-full">
        <Header />
        {/* <header className="fixed top-0 inset-x-0 z-50 flex h-16 items-center gap-2 px-4 border-b text-white">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg font-semibold">MechaKeys</h1>
        </header> */}
        <div className="">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
