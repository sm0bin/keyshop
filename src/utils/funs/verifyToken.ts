import { jwtDecode } from "jwt-decode";
interface IJwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const verifyToken = (token: string) => {
  return jwtDecode(token) as IJwtPayload;
};
