/* eslint-disable @next/next/no-page-custom-font */
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/userContext";
import { AllHabitsProvider } from "./context/allHabitsContext";
import { Suspense } from "react";
import Loading from "./Loading/Loading";
import { AuthProvider } from "./context/authContext";

export const metadata: Metadata = {
  title: "Loop Habit Tracker",
  description:
    "A web application to help you track, manage, and improve your daily habits effectively.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <UserProvider>
            <AllHabitsProvider>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </AllHabitsProvider>
          </UserProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
