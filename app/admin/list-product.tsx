'use client'
import ProductManagement from "./product";
import { useManageProduct } from "./useManageProduct";

export default function ManagePage() {
    const { listItems, isLoading, error } = useManageProduct();
    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>{error}</div>;

    return(
        <div>
            <ProductManagement products={listItems}/>
        </div>
    )
}