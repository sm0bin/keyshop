import Sidebar from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="pt-16">
      {/* <Sidebar /> */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
