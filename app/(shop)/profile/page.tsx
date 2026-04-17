import { authOptions } from "@/lib/auth";
import { getProfileUSer } from "@/service/user.service";
import { getServerSession } from "next-auth";

import Image from "next/image";
import { redirect } from "next/navigation";
export default async function UserProfile(){
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    if (!accessToken) {
        redirect("/login");
    }
    
    const profile = await getProfileUSer(accessToken);
    return(
        <div className="border rounded-2xl p-4 flex flex-col items-center">
            <div className="font-bold text-xl">THÔNG TIN KHÁCH HÀNG</div>
            <div className="mb-4">
            <div>
                <Image 
                    src={"https://content.pancake.vn/1/s2360x2950/fwebp90/3a/85/76/63/0f2a3b1e0161cf6e7782dd2d0babb7f5b8a42b439f69c996c4a72f6b-w:3000-h:3750-l:868437-t:image/jpeg.jpeg"} 
                    width={300} 
                    height={300} 
                    alt={""}
                />
            </div>
            <div>
                <p><span className="font-bold">Email: </span>{profile.email}</p>
                <p><span className="font-bold">Ngày tạo:</span>{profile.created_at}</p>
                <p><span className="font-bold">Trạng thái:</span>{profile.status=='ACTIVE'?'Đã xác thực':'Chưa xác thực'}</p>
            </div>

            </div>
        </div>
    )
}