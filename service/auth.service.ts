export interface AccountCreateReq{
    email:string;
    password: string;
}

export interface UserRes{
    id: number;
    email:string;
    created_at:string;
    status:string;
    imgUrl:string;
}
export interface AuthResponse{
    accessToken:string;
    refreshToken:string;
    expiresIn:number;
}
export const registerAccount = async (data: AccountCreateReq): Promise<UserRes> => {
    try {
        const res = await fetch(`http://localhost:8080/api/public/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || "Register failed");
        }

        return result;

    } catch (error: any) {
        throw error;
    }
};
export const verifyOtp = async(otp:string,userId:number):Promise<AuthResponse>=>{
   try {
    const res = await fetch(`http://localhost:8080/api/public/verify-otp?otp=${otp}&userId=${userId}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
    });
    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.message || 'Xác thực OTP thất bại');
    }

    return await res.json();
  } catch (error) {
    console.error("Lỗi verifyOtp:", error);
    throw error;
  }
}