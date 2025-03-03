"use client";
import Link from "next/link";
import "../formStyle.css";
import { useAuth } from "@/app/context/authContext";
import GoogleButton from "@/app/components/GoogleButton";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";
import { toast } from "react-toastify";

function Login() {
  const { login, loading } = useAuth();
  const { user, loading: userLoading } = useUser();

  const router = useRouter();
  useEffect(() => {
    if (userLoading) return; // Prevents redirect while still loading
    if (user?.emailVerified) {
      router.replace("/");
    }
  }, [user, userLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await login(email, password);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.message || "Failed to log in.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-dark2 flex items-center justify-center">
      <div className="form-container">
        <p className="title">Login</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
            <div className="forgot">
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || userLoading}
            className="sign customShadow"
          >
            {loading || userLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="social-message">
          <div className="line"></div>
          <p className="message uppercase">or</p>
          <div className="line"></div>
        </div>
        <div className="social-icons mb-4">
          <GoogleButton />
        </div>
        <p className="switch">
          Don&apos;t have an account?
          <Link href="/auth/signup" className="ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
