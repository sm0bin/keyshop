import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "@/utils/funs/verifyToken";
import { useAppDispatch } from "@/redux/hook";
import { setUser, type IUser } from "@/redux/features/auth/authSlice";

export default function Login() {
  const [loginUser, { isLoading, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
        navigate(`/${user.role}/dashboard`);
      })
      .catch((error) => {
        // Handle error, e.g., show error message
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-xl border border-white/20 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/60" size={18} />
            <Input
              className="pl-10 bg-white/10 text-white placeholder:text-white/70 border-white/30"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/60" size={18} />
            <Input
              type="password"
              className="pl-10 bg-white/10 text-white placeholder:text-white/70 border-white/30"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200 font-bold"
            disabled={isLoading}
          >
            Login
          </Button>
        </form>
        <p className="text-white/70 text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
