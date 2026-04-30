import { ItemRes, PageResponse } from "@/types/item"
import { ProductListParams } from "@/types/params"
import { NextResponse } from "next/server"

// lib/api-client.ts
const API_VERSION = 'v1'
const API_PREFIX = '/api'

export const apiClient = {
   products: {
    list: async (params: ProductListParams): Promise<PageResponse<NextResponse>> => {
      const res = await fetch(`${API_PREFIX}/${API_VERSION}/product?${new URLSearchParams(params as any)}`)
      return res.json()
    }
  }
}