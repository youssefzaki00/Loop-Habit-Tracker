"use client";
import Link from "next/link";
import "../formStyle.css";
import { toast } from "react-toastify";
import { useSignupWithEmail } from "../auth";
import Loading from "@/app/Loading/Loading";
import GoogleButton from "@/app/components/GoogleButton";
function SignupPage() {
  const { user, error, isLoading, submitUserData } = useSignupWithEmail();
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
    } else if (String(password).length < 6) {
      toast.error("Password must be at least 6 letters");
    } else {
      submitUserData(name, email, password);
    }
  };

  if (isLoading) return <Loading />;
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
              type="text"
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
          <button disabled={isLoading} className="sign customShadow bg-main">
            Sign up
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
          <Link rel="noopener noreferrer" href="/auth/login" className="ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default SignupPage;
