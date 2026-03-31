import { getItems } from "@/service/item.service";
import ItemCard from "@/components/item/item-card";

export default async function HomePage() {
  // Lấy dữ liệu ngay trên Server
  const data = await getItems(0,10);
  const items = data?.content || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase italic">New Collection</h1>
        <div className="h-1 w-20 bg-black mx-auto"></div>
      </header>

      {/* Grid sản phẩm */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}