// app/product-section.tsx
'use client'
import ItemCard from '@/components/item/item-card';
import Pagination from '@/components/item/pagination';
import { ItemRes } from '@/types/item';

interface ProductSectionProps {
  items: ItemRes[];
  totalPages: number;
  currentPage: number;
}

export default function ProductSection({ items, totalPages, currentPage }: ProductSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
      
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}