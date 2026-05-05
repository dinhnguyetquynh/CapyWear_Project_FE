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
  }
}