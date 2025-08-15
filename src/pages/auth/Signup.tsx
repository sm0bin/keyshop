import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, EyeClosed, Eye } from "lucide-react";
import { useCreateUserMutation } from "@/redux/features/auth/authApi";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Signup() {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setForm((prev) => ({ ...prev, role: value }));
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required.");
      return false;
    } else if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    } else if (form.name.length < 2) {
      toast.error("Name must be at least 2 characters long.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        toast.error(error.data.message || "Failed to create user.");
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User
              className="absolute left-2 inset-y-2 text-gray-400/60"
              size={18}
            />
            <Input
              className="pl-10"
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="relative">
            <Select
              name="role"
              value={form.role}
              onValueChange={handleRoleChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white/10 backdrop-blur-md border-white/10">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Sign Up
          </Button>
        </form>
        <p className="text-white/70 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
