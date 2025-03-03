"use client";
import Link from "next/link";
import "../formStyle.css";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/authContext";
import GoogleButton from "@/app/components/GoogleButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";

function SignupPage() {
  const { login, loading } = useAuth();
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    if (!userLoading && user?.emailVerified) {
      router.replace("/");
    }
  }, [user, userLoading, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;

    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    login(name, email, password);
  };

  return (
    <div className="min-h-screen w-screen bg-dark2 flex items-center justify-center">
      <div className="form-container">
        <p className="title">Sign Up</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input type="text" name="name" id="name" placeholder="Username" />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
            />
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            disabled={loading || userLoading}
            className="sign customShadow bg-main"
          >
            {loading || userLoading ? "Signing up..." : "Sign up"}
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
          Already have an account?
          <Link href="/auth/login" className="ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
