import { logout, selectToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/funs/verifyToken";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  if (!token || !user || (role && user.role !== role)) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
};

type TProtectedRouteProps = {
  children: React.ReactNode;
  role?: string;
};

export default ProtectedRoute;
