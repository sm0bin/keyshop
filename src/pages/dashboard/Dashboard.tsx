import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
