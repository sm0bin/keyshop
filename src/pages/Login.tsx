import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setUser, type IUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/funs/verifyToken";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    id: "146dc7d8-9cd2-4d98-baf1-ee7b149f2ee0",
    password: "12345678",
  });
  const [login] = useLoginMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");

    console.log("Form data:", form);
    try {
      const response = await login(form).unwrap();
      const user = verifyToken(response.data.accessToken) as IUser;
      dispatch(setUser({ user: user, token: response.data.accessToken }));
      toast.success("Login successful!");
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto pt-40">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your ID and password below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="id">ID</Label>
              <Input
                id="id"
                name="id"
                type="text"
                placeholder="Your ID"
                value={form.id}
                onChange={onChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <CardFooter className="flex-col gap-2 mt-6 p-0">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
