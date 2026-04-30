import { ProductListParams } from "@/types/params";
import ProductSection from "./product-section";

export default async function HomePage({ searchParams }:{searchParams:Promise<ProductListParams>}) {
  const params = await searchParams;
  return (
    <div className="max-w-7xl min-h-screen">
      <ProductSection params={params} />
    </div>
  )
}