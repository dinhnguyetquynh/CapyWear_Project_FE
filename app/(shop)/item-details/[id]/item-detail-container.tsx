'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import ItemDetail from './item-detail';
import { ItemRes } from '@/types/item';

export default function ItemDetailContainer({ itemId }: { itemId: string }) {
    const [data, setData] = useState<ItemRes | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.products.getDetail(itemId);
                setData(response.result);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [itemId]);

    if (loading) return <div>Đang tải sản phẩm...</div>;
    if (!data) return <div>Không tìm thấy sản phẩm.</div>;

    return <ItemDetail item={data} />;
}