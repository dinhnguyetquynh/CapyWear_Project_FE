'use server'
import { CartDetailReq } from "@/types/cart";
import { ApiRes } from "@/types/general";
import { getAccessToken } from "./auth-server.service";


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

export async function getCartList(): Promise<ApiRes<any>> {
  const token = await getAccessToken(); 
  console.log("ACCESSTOKEN OF GET CART LIST:"+token);
  if(!token){
    console.log("ACCESSTOKEN OF GET CART LIST IS UNDEFINED");
  }
  const backendUrl = process.env.BACKEND_API_URL;
  try{
    const response = await fetch(`${backendUrl}/api/cart/detail`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    const data : ApiRes<any> = await response.json();
    if(!response.ok){
       return {
        code: data.code || response.status,
        message: data.message || "Lấy danh sách sản phẩm trong giỏ hàng thất bại",
        result: null
      };
    }
    return data;

  }catch (error) {
    console.error("Cart Action Error:", error);
    return {
      code: 500,
      message: "Không thể kết nối đến máy chủ",
      result: null
    };
  }
}

export async function deleteCartItemAction(cartDetailId: number, token?: string): Promise<ApiRes<any>> {
  const backendUrl = process.env.BACKEND_API_URL;

  try {
    const response = await fetch(`${backendUrl}/api/cart/${cartDetailId}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data: ApiRes<any> = await response.json();

    if (!response.ok) {
      return {
        code: data.code || response.status,
        message: data.message || "Xóa sản phẩm thất bại",
        result: null
      };
    }

    return data;
  } catch (error) {
    console.error("Delete Cart Action Error:", error);
    return {
      code: 500,
      message: "Không thể kết nối đến máy chủ",
      result: null
    };
  }
}