"use client";

import { verifyOtp } from '@/service/auth.service';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

const OTPInput = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const email = searchParams.get('email');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const router = useRouter();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return; 

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData("text").slice(0, 6); 
    if (!/^\d+$/.test(data)) return; 
    const newOtp = [...otp];
    data.split("").forEach((char, index) => {
      newOtp[index] = char;
      inputRefs.current[index]?.blur(); 
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(data.length, 5)]?.focus();
  };

  const handleSubmit = async() => {
    const code = otp.join("");
    const result = await signIn("otp-verify", {
    otp: code,
    userId: userId, // ID bạn lấy từ trang register truyền qua
    redirect: false, 
  });

  if (result?.error) {
    alert("Mã OTP không đúng!");
  } else {
    // ĐÃ ĐĂNG NHẬP XONG! Token đã nằm trong Cookie.
    router.push("/");
  }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md w-full max-w-md mx-auto my-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Xác thực OTP</h2>
      <p className="text-gray-500 mb-8 text-center">Chúng tôi đã gửi mã gồm 6 chữ số đến thiết bị của bạn.</p>
      
      <div className="flex gap-2 mb-8" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => {inputRefs.current[index] = el;}}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg active:scale-95"
      >
        Xác nhận
      </button>
      
      <button 
        onClick={() => setOtp(new Array(6).fill(""))}
        className="mt-4 text-sm text-gray-500 hover:text-blue-600 underline"
      >
        Xóa tất cả
      </button>
    </div>
  );
};

export default OTPInput;