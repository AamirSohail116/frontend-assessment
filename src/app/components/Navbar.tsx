/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Logo from "./logo";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from sessionStorage", e);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="fixed top-0 w-full h-20 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-4 rounded-2xl"
              >
                Logout
              </button>
              <button className="bg-gray-900 text-white py-2 px-4 rounded-2xl">
                <Link href="/stock">Free Access</Link>
              </button>
            </>
          ) : (
            <>
              <button className="bg-gray-900 text-white py-2 px-4 rounded-2xl">
                <Link href="/sign-in">Login</Link>
              </button>
              <button className="bg-gray-900 text-white py-2 px-4 rounded-2xl">
                <Link href="/stock">Free Access</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
