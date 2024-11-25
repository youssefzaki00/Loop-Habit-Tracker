"use client";
import { useEffect, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/firebase";
import Loading from "@/app/Loading/Loading";

const VerifyEmailPage = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        router.push("/auth/login");
        return;
      }

      if (currentUser.emailVerified) {
        router.push("/");
        return;
      }

      setIsEmailVerified(currentUser.emailVerified);
      setIsLoading(false);
    };

    // Call the authentication check function
    checkUserAuthentication();
  }, [router]);

  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        toast.info("Verification email sent again. Please check your inbox.");
      } catch (err) {
        toast.error("Error sending verification email. Please try again.");
      }
    }
  };

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isEmailVerified) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Email Verified
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Your email has been verified! You can now proceed with your account.
        </p>
        <button
          className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-colors"
          onClick={handleLoginRedirect}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-dark2 p-6">
      <h1 className="text-4xl font-semibold text-gray-100 mb-4">
        Verify Your Email
      </h1>
      <p className="text-lg text-gray-200 mb-4">
        Please check your inbox for the verification email we sent you.
      </p>
      <p className="text-lg text-gray-200 mb-6">
        If you haven&apos;t received it, click the button below to resend the
        verification email.
      </p>
      <button
        className={`bg-main text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600 transition-colors ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={resendVerificationEmail}
        disabled={isLoading}
      >
        Resend Verification Email
      </button>
    </div>
  );
};

export default VerifyEmailPage;
