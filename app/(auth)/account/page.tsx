'use client'
import { registerAccount } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CreateAccount(){
    const router = useRouter();
    const[email,setEmail]=useState("");
    const[password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        console.log("ĐÃ GỌI TỚI HÀM HANDLE REGISTER")
        if (!email || !password || !confirmPassword) {
            alert("Vui lòng điền đầy đủ thông tin");
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }
        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp");
            setError("Mật khẩu nhập lại không khớp");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await registerAccount({email,password});
            console.log("RESULT :"+result.email);
            const id = result.id;
            const userEmail = result.email;
            router.push(`/verify?id=${id}&email=${encodeURIComponent(userEmail)}`);
        } catch (err: any) {
            console.log(err.message);
            alert(err.message);
            setError(err.message || "Có lỗi xảy ra, vui lòng thử lại");
        } finally {
            setIsLoading(false);
        }
    };


    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="font-bold mb-4 text-xl">TẠO TÀI KHOẢN</div>
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
             <div>
                <label htmlFor="pw-input" className="w-30 inline-block">Nhập mật khẩu</label>
                <input
                    type="password"
                    id="pw-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mx-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
             <div>
                <label htmlFor="pw-input1" className="w-30 inline-block">Nhập lại mật khẩu</label>
                <input
                    type="password"
                    id="pw-input1"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mx-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            </div>
            <div>
                <button 
                    className="mt-8 border p-3 rounded-xl text-lg bg-green-500 text-white hover:bg-green-400 active:scale-[0.98] transition-all"
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                     {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
                {isLoading && (
                    <p style={{ color: "blue", marginTop: "10px" }}>
                        Đang xử lý. Vui lòng đợi chút nhé...
                    </p>
                )}
            </div>

        </div>
    )
}