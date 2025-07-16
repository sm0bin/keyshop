import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default UserLayout;
