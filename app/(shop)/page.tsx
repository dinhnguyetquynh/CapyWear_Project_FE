// import { redirect } from "next/navigation";
// export const dynamic = "force-dynamic";
// export default function RootPage() {
//   // Tự động chuyển hướng sang trang sản phẩm
//   // redirect("/products");
//   return(
//     <div>
//       <p>HELLO HOME PAGE</p>
//     </div>
//   )
// }

import { getItems } from "@/service/item.service";
import ItemCard from "@/components/item/item-card";
import Pagination from "@/components/item/pagination";
export const dynamic = "force-dynamic";
export default async function HomePage({searchParams,}:{searchParams: Promise<{ page?: string; minPrice?: string; maxPrice?: string }>;}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 0;
  const pageSize = 10;
  const minPrice = params.minPrice !== undefined ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice !== undefined ? Number(params.maxPrice) : undefined;

  // Lấy dữ liệu ngay trên Server
  const data = await getItems(currentPage, 10, minPrice, maxPrice);
  const items = data?.content || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className="max-w-7xl min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item)=>(
          <ItemCard key={item.id} item={item}/>
        ))}
      </div>
      <div className="mt-10">
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
        />
      </div>
     
    </div>
  );
}
