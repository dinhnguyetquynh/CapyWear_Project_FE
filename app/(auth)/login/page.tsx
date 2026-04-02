"use client"

import { signIn } from "next-auth/react";
import { useState } from "react"

export default function LoginPage(){
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    const handleLogin = async() =>{
        const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: "/", 
  });
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">LOGIN</h2>
            <div className="space-y-6">
            <div>
                <label htmlFor="email-input" className="w-30 inline-block">Nhập email</label>
                <input
                    type="email"
                    id="email-input"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mx-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="mt-4">
                 <label htmlFor="password-input" className="w-30 inline-block">Nhập password</label>
                <input
                    type="password"
                    id="password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mx-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <button 
                onClick={handleLogin}
                className="w-full bg-gray-950 text-white rounded-xl font-bold py-2 hover:bg-gray-800 active:scale-[0.98] transition-all"
            >
                Đăng nhập
            </button>
            </div>
            </div>
        </div>
    )
}