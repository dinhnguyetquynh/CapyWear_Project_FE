import { ApiRes } from "@/types/general";
import { UserRes } from "./auth.service";

export const getProfileUSer = async(token:string):Promise<UserRes>=>{
    const backendUrl = process.env.BACKEND_API_URL;
    try{
        const respone = await fetch(`${backendUrl}/api/user`,{
            method:'GET',
             headers:{
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
            }
        })
        if(!respone.ok){
            const errorData = await respone.json();
            throw new Error(errorData.message||'Khong lay duoc du lieu user');
        }
        const data:ApiRes<UserRes> = await respone.json();
        return data.result;
    }catch (error) {
        console.error("Lỗi khi gọi API getProfileUser:", error);
        throw error;
    }
}