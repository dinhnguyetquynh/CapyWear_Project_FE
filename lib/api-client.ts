import { CartDetailReq } from "@/types/cart"
import { ApiRes } from "@/types/general"
import { ItemRes, PageResponse } from "@/types/item"
import { ProductListParams } from "@/types/params"
import { NextResponse } from "next/server"

// lib/api-client.ts
const API_VERSION = 'v1'
const API_PREFIX = '/api'

export const apiClient = {
   products: {
    list: async (params: ProductListParams): Promise<PageResponse<NextResponse>> => {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
      );
      const queryString = new URLSearchParams(filteredParams as any).toString();

      const res = await fetch(`${API_PREFIX}/${API_VERSION}/products?${queryString}`);
      return res.json();
    },
    getDetail: async (itemId: string | number): Promise<ApiRes<ItemRes>> => {
      const res = await fetch(`${API_PREFIX}/${API_VERSION}/product-detail/${itemId}`);
      return res.json()
    }
  },
  cart:{
    add: async(payload: CartDetailReq):Promise<ApiRes<any>>=>{
      try {
      const response = await fetch(`${API_PREFIX}/${API_VERSION}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data :ApiRes<any>= await response.json();

      if (!response.ok) {
        return {
          code: response.status,
          message:data.message || "Lỗi khi xử lý giỏ hàng",
          result: null,
        }
      }

      return data;
    } catch (error) {
      return {
        code: 500,
        message: "Lỗi kết nối mạng",
        result: null,
      };
    }
  },
  getDetail: async (): Promise<ApiRes<any>> => {
      try {
        const res = await fetch(`${API_PREFIX}/${API_VERSION}/cart`);
        
        const data: ApiRes<any> = await res.json();

        if (!res.ok) {
          return {
            code: res.status,
            message: data.message || "Không thể lấy thông tin giỏ hàng",
            result: null,
          };
        }
        return data;
      } catch (error) {
        return {
          code: 500,
          message: "Lỗi kết nối mạng",
          result: null,
        };
      }
    },
  }
}
