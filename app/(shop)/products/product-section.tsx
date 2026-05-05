'use client'
import { useEffect, useState } from 'react'

import ItemCard from '@/components/item/item-card';
import Pagination from '@/components/item/pagination';
import { ItemRes } from '@/types/item';
import { ProductListParams } from '@/types/params';
import { apiClient } from '@/lib/api-client';

export default function ProductSection({ params }: { params:ProductListParams}) {
  const [items, setItems] = useState<ItemRes[]>([]);
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.products.list({
          page: Number(params.page) || 0,
          minPrice: Number(params.minPrice) || undefined,
          maxPrice: Number(params.maxPrice) || undefined,
        })
      const data = response instanceof Response ? await response.json() : response;
      setItems(data?.content|| []);
      setTotalPages(data?.totalPages || 0);
    }
    fetchData()
  }, [params])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      <Pagination currentPage={Number(params.page) || 0} totalPages={totalPages} />
    </>
  )
}