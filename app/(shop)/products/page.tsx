// import { ProductListParams } from "@/types/params";
// import ProductSection from "./product-section";
// import { Suspense } from "react";
// export const dynamic = "force-dynamic";
// export default async function HomePage({ searchParams }:{searchParams:Promise<ProductListParams>}) {
//   return (
//     <div className="max-w-7xl min-h-screen">
//       <Suspense fallback={<div>Đang tải...</div>}>
//         <ProductSection />  
//       </Suspense>
//     </div>
//   )
// }

// app/page.tsx
import { ProductListParams } from "@/types/params";
import ProductSection from "./product-section";
import { Suspense } from "react";
import { getItems } from "@/service/item.service";

export const dynamic = "force-dynamic";

export default async function HomePage({ 
  searchParams 
}: { 
  searchParams: Promise<ProductListParams> 
}) {
  // 1. Await params từ URL
  const params = await searchParams;
  
  const page = Number(params.page) || 0;
  const size =10;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  // 2. Gọi API trực tiếp tại Server
  const response = await getItems(page,size, minPrice, maxPrice);
  const data = response instanceof Response ? await response.json() : response;

  return (
    <div className="max-w-7xl min-h-screen p-8">
      {/* 
          Dùng key cho Suspense dựa trên params để Next.js biết 
          cần hiển thị fallback khi URL thay đổi 
      */}
      <Suspense key={JSON.stringify(params)} fallback={<div>Đang tải sản phẩm...</div>}>
        <ProductSection 
          items={data?.content || []} 
          totalPages={data?.totalPages || 0}
          currentPage={page}
        />
      </Suspense>
    </div>
  );
}