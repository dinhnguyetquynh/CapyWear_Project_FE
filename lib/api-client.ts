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
      const res = await fetch(`${API_PREFIX}/${API_VERSION}/products?${new URLSearchParams(params as any)}`)
      return res.json()
    },
    getDetail: async (itemId: string | number): Promise<ApiRes<ItemRes>> => {
      const res = await fetch(`${API_PREFIX}/${API_VERSION}/product-detail/${itemId}`);
      return res.json()
    }
  }
}