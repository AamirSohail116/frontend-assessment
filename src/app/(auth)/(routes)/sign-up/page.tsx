"use client";

import { useState, ChangeEvent } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (): Promise<void> => {
    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      if (userCredential) {
        console.log({
          user: userCredential,
          fullName,
        });
        sessionStorage.setItem("user", "true");
        setFullName("");
        setEmail("");
        setPassword("");
        router.push("/sign-in");
      }
    } catch (e) {
      console.error("Error creating user:", e);
    }
  };

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#e8e8e8]">
      <div className=" w-full max-w-[500px] rounded-xl bg-gray-900 p-8 text-gray-100 shadow-xl">
        <p className="text-center text-2xl font-bold">Sign Up</p>

        <form className="mt-6 space-y-4">
          <div className="space-y-1">
            <label htmlFor="fullName" className="block text-sm text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={handleFullNameChange}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className={`w-full rounded-md py-3 font-semibold text-gray-900 transition ${
              loading
                ? "cursor-not-allowed bg-indigo-400"
                : "bg-[#a78bfa] hover:bg-[#9374f9]"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {error && (
            <p className="mt-4 text-center text-sm text-red-500">
              {error.message}
            </p>
          )}
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?
          <Link
            href="/sign-in"
            className="ml-1 text-gray-100 underline decoration-transparent transition hover:decoration-[#a78bfa]"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
