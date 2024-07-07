"use client";
import React, { useState } from "react";
import admin from "../asset/admin.jpg";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className="h-[100vh] w-screen-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${admin.src})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="w-[430px] h-[320px] bg-[#465942ba] text-white m-2 bg-opacity-30 backdrop-filter backdrop-blur-sm p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-center">
            <h3 className="text-2xl font-bold mb-4">Admin Login</h3>
          </div>
          <div className="space-y-4">
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Masukkan email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => signIn('credentials', {email, password, redirect: true, callbackUrl: '/'})}
                type="submit"
                className="bg-[#5f4545] text-white px-4 py-2 rounded-md hover:bg-[#332525] focus:outline-none focus:bg-[#382828]"
              >
                Masuk
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
