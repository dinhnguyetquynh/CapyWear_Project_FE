'use client'
import { useEffect, useState } from 'react'

import ItemCard from '@/components/item/item-card';
import Pagination from '@/components/item/pagination';
import { ItemRes } from '@/types/item';
import { ProductListParams } from '@/types/params';
import { apiClient } from '@/lib/api-client';
import { useSearchParams } from 'next/navigation';

export default function ProductSection() {
  const searchParams = useSearchParams()
  const [items, setItems] = useState<ItemRes[]>([]);
  const [totalPages, setTotalPages] = useState(0)

  const page = Number(searchParams.get('page')) || 0
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined

    useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.products.list({ page, minPrice, maxPrice })
      const data = response instanceof Response ? await response.json() : response
      setItems(data?.content || [])
      setTotalPages(data?.totalPages || 0)
    }
    fetchData()
  }, [page, minPrice, maxPrice])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
       <Pagination currentPage={page} totalPages={totalPages} />
    </>
  )
}