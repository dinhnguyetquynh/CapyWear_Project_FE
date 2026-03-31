import { getItems } from "@/service/item.service";
import ItemCard from "@/components/item/item-card";

export default async function HomePage() {
  // Lấy dữ liệu ngay trên Server
  const data = await getItems(0,10);
  const items = data?.content || [];

  return (
    <div className="max-w-7xl min-h-screen border-2 bg-amber-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {items.map((item)=>(
          <ItemCard key={item.id} item={item}/>
        ))}
      </div>
    </div>
  );
}