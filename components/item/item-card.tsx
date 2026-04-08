import Image from "next/image";
import { ItemRes } from "@/types/item";
import Link from "next/link";

export default function ItemCard({ item }: { item: ItemRes }) {
  return (
    <Link 
      href={`/item-details/${item.id}`}
      className="group border p-4 rounded-lg hover:shadow-lg transition-all bg-white"
    >
      <div className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
        <Image
          src={item.urlImg} 
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
  
        <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
          New
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-tight truncate">
          {item.name}
        </h3>
        
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-black text-black">
            {item.price.toLocaleString("vi-VN")} ₫
          </p>
          <span className="text-[11px] text-gray-400 font-medium">
            Kho: {item.inventoryQty}
          </span>
        </div>
      </div>
    </div>
    </Link>
    
  );
}