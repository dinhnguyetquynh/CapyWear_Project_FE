"use client"

import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function LoginPage(){
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (result?.error) {
      alert("Đăng nhập thất bại: " + result.error);
      setLoading(false);
      return;
    }

    const session = await getSession();

    if (session) {
      const roles = session.roles as string[]; 
      console.log("roles:"+roles)
      if (roles?.includes("ADMIN")) {
        router.push("/admin");
      } else {
        router.push("/");
      }
      
      router.refresh(); 
    }
    setLoading(false);
  };

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
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">Hoặc</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold py-2 hover:bg-gray-50 transition-all"
                    >
                        <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5" />
                        Đăng nhập bằng Google
                    </button>

                    <Link href="/account" className="block text-center text-blue-400 hover:underline">Tạo tài khoản</Link>
            </div>
            </div>
        </div>
    )
}