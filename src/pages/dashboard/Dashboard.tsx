import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="pt-20">
      <Outlet />
    </div>
  );
};

export default Dashboard;
