'use client'
import ProductItem from "@/components/admin/product-item";
import { ItemRes } from "@/types/item";
import AddProductModal from "./AddProductModal";
import { useState } from "react";
import { createItem } from "@/service/item.service";
import { useSession } from "next-auth/react";

export default function ProductManagement({ products: initialProducts }: { products: ItemRes[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const session = useSession();
  const accessToken = session.data?.accessToken;

  const handleAddProduct = async (data: any) => {
    try {
      if(!accessToken) return;
      const result = await createItem(accessToken, data);
      alert("Thêm thành công!");
      setProducts([result.result, ...products]); 
      setIsModalOpen(false);
    } catch (error: any) {
      alert(error.message);
    }
  };
  const handleUpdateProduct = (updatedProduct:ItemRes)=>{
    setProducts((prevProducts)=>
      prevProducts.map((p)=>
        p.id===updatedProduct.id ? updatedProduct : p
      )
    );
  };
  const handleDeleteProduct =(itemId:number)=>{
    setProducts((prev)=>prev.filter((p)=>p.id!==itemId));
  }
  return (
    <div className="max-w-5xl mx-auto mt-10">
    
      <h1 className="text-2xl font-bold text-center mb-8">Quản lý sản phẩm</h1>
      <div>
        <button 
          className="border rounded-sm p-2 mb-2 bg-amber-200"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm sản phẩm + 
        </button>
      </div>
      {/* Table Header */}
      <div className="flex items-center bg-[#F1F1F1] p-4 mb-2 rounded-sm text-sm font-semibold">
        <div className="w-24 text-center">Hình</div>
        <div className="grid grid-cols-3 flex-1 ml-10">
          <div className="text-center">Tên</div>
          <div className="text-center">Giá</div>
          <div className="text-center">Số lượng</div>
        </div>
        <div className="w-32"></div> {/* Khoảng trống bù cho các icon admin */}
      </div>

      {/* List items */}
      {products?.map(product => (
        <ProductItem 
          key={product.id} 
          product={product} 
          onUpdate={handleUpdateProduct}
          onDelete={handleDeleteProduct}
        />
      ))}

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddProduct}
      />
    </div>
  );
}