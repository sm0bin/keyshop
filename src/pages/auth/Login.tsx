import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, EyeClosed, Eye } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "@/utils/funs/verifyToken";
import { useAppDispatch } from "@/redux/hook";
import { setUser, type IUser } from "@/redux/features/auth/authSlice";
import { Card } from "@/components/ui/card";

export default function Login() {
  const [loginUser, { isLoading, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(form)
      .unwrap()
      .then((response) => {
        const user = verifyToken(response.data.accessToken);
        dispatch(setUser({ user: user, token: response.data.accessToken }));
        toast.success("Login successful!");
        if (user.role === "admin") {
          navigate(`/dashboard`);
        } else {
          navigate("/products");
        }
      })
      .catch((error) => {
        toast.error("Login failed. Please try again.");
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute left-2 inset-y-2 text-gray-400/60"
              size={18}
            />
            <Input
              className="pl-10"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Lock
              className="absolute left-2 inset-y-2 text-gray-400/60"
              size={18}
            />
            <button
              type="button"
              className="absolute right-2 inset-y-2 text-gray-400/60"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeClosed size={16} /> : <Eye size={16} />}
            </button>
            <Input
              type={passwordVisible ? "text" : "password"}
              className="pl-10"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Login
          </Button>
        </form>
        <p className="text-white/70 text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="underline">
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
}
