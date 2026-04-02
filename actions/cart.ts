'use server';
import { ApiRes } from "@/types/general";

 //run on server
export interface CartDetailReq{
    itemId:number,
    quantity:number
}

export async function addToCartAction(req: CartDetailReq, token?: string): Promise<ApiRes<any>> {
  const backendUrl = process.env.BACKEND_API_URL;

  try {
    const response = await fetch(`${backendUrl}/api/cart/add-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(req), 
    });

    const data: ApiRes<any> = await response.json();
    if (!response.ok) {
      return {
        code: data.code || response.status,
        message: data.message || "Lỗi khi thêm vào giỏ hàng",
        result: null
      };
    }

    return data; 
  } catch (error) {
    console.error("Cart Action Error:", error);
    return {
      code: 500,
      message: "Không thể kết nối đến máy chủ",
      result: null
    };
  }
}