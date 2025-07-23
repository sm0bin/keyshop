import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { useCreateUserMutation } from "@/redux/features/auth/authApi";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Signup() {
  //   const dispatch = useAppDispatch();
  const [createUser, { data, isLoading, isError }] = useCreateUserMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(signupUser(form));
    createUser(form)
      .unwrap()
      .then((response) => {
        // Handle successful signup, e.g., redirect to login or dashboard
        console.log("User created successfully:", response);
        toast.success("User created successfully!");
        navigate("/login");
      })
      .catch((error) => {
        // Handle error, e.g., show error message
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-xl border border-white/20 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-white/60" size={18} />
            <Input
              className="pl-10 bg-white/10 text-white placeholder:text-white/70 border-white/30"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/60" size={18} />
            <Input
              className="pl-10 bg-white/10 text-white placeholder:text-white/70 border-white/30 focus:bg-white/20"
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
            className="w-full border border-white/40 bg-white/25 text-white backdrop-blur-md hover:bg-white/35 transition shadow-lg shadow-white/10 font-semibold"
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </form>
        <p className="text-white/70 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
