"use client";

import { useState, ChangeEvent } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const handleSignIn = async (): Promise<void> => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(email, password);
      if (user) {
        console.log({ user });
        sessionStorage.setItem("user", "true");
        setEmail("");
        setPassword("");
        router.push("/");
      }
    } catch (e) {
      console.error("Sign-in error:", e);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#e8e8e8]">
      <div className="w-full max-w-[500px] rounded-xl bg-gray-900 p-8 text-gray-100 shadow-xl border border-gray-800">
        <p className="text-center text-2xl font-bold">Sign In</p>

        <form className="mt-6 space-y-4">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm text-gray-400">
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSignIn}
            disabled={loading}
            className={`w-full rounded-md py-3 font-semibold text-gray-900 transition ${
              loading
                ? "cursor-not-allowed bg-indigo-400"
                : "bg-[#a78bfa] hover:bg-[#9374f9]"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">
              {error.message}
            </p>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Dont have an account?{" "}
          <Link
            href="sign-up"
            className="font-medium text-gray-100 underline decoration-transparent transition hover:decoration-[#a78bfa]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
