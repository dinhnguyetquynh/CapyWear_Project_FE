"use client";
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useRef, Suspense } from 'react';

const OTPInput = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo
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
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d+$/.test(data)) return;

    const newOtp = [...otp];
    const digits = data.split("");
    
    digits.forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    
    setOtp(newOtp);
    
    // Focus vào ô cuối cùng sau khi paste hoặc ô tiếp theo nếu chưa đủ 6 số
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      alert("Vui lòng nhập đủ 6 số!");
      return;
    }

    const result = await signIn("otp-verify", {
      otp: code,
      userId: userId,
      redirect: false,
    });

    if (result?.error) {
      alert("Mã OTP không đúng hoặc đã hết hạn!");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md w-full max-w-md mx-auto my-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Xác thực OTP</h2>
      <p className="text-gray-500 mb-8 text-center">Chúng tôi đã gửi mã gồm 6 chữ số đến thiết bị của bạn.</p>
      
      <div className="flex gap-2 mb-8" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            ref={(el) => { inputRefs.current[index] = el; }}
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

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Suspense fallback={<div className="flex items-center justify-center">Đang tải...</div>}>
        <OTPInput />
      </Suspense>
    </main>
  );
}