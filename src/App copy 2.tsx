import Header from "./components/layout/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black w-full min-h-svh">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
