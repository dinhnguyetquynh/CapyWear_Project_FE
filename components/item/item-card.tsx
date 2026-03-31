import Image from "next/image";
import Link from "next/link";
import { ItemRes } from "@/types/item";

export default function ItemCard({ item }: { item: ItemRes}) { 
  return (
    <div className="group border rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
      <Link href={''}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={'https://bizweb.dktcdn.net/100/575/016/products/mc10224920ec9534129a4b3d79b600.jpg?v=1773136916927'} // Lấy ảnh đầu tiên làm ảnh đại diện
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </Link>
      <div className="p-4 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{item.inventoryQty}</p>
        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-red-500 font-bold mt-2">
          {item.price.toLocaleString("vi-VN")} ₫
        </p>
      </div>
    </div>
  );
}