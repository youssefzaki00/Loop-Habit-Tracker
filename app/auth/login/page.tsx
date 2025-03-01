"use client";
import Link from "next/link";
import "../formStyle.css";
import { useLoginWithEmail } from "../auth";
import Loading from "@/app/Loading/Loading";
import GoogleButton from "@/app/components/GoogleButton";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";

function Login() {
  const { error, isLoading, loginUser } = useLoginWithEmail();
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // Track initial auth check
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Add email verification check here
      if (user?.emailVerified) {
        router.push("/");
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, [router]);

  if (authChecked && auth.currentUser?.emailVerified) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    loginUser(email, password);
  };

  if (!authChecked || isLoading) return <Loading />;

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
            disabled={isLoading}
            className="sign customShadow"
          >
            {isLoading ? "Logging in..." : "Login"}
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
