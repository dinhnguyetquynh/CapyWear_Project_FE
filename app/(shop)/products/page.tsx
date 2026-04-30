import { ProductListParams } from "@/types/params";
import ProductSection from "./product-section";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export default async function HomePage({ searchParams }:{searchParams:Promise<ProductListParams>}) {
  const params = await searchParams;
  return (
    <div className="max-w-7xl min-h-screen">
      <Suspense fallback={<div>Đang tải...</div>}>
        <ProductSection params={params} />
      </Suspense>
    </div>
  )
}