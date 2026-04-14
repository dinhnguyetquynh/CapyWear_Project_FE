'use client'
import React, { useState } from 'react';
import { PencilLine, Trash2 } from 'lucide-react';
import { ItemRes } from '@/types/item';
import AddProductModal from '@/app/admin/AddProductModal';
import { useSession } from 'next-auth/react';
import { deleteItem, updateItem } from '@/service/item.service';
import { toast } from 'sonner';
import ConfirmModal from '../common/confirm-modal';

interface ProductItemProps {
  product: ItemRes;
  onUpdate:(updateProduct:ItemRes)=>void;
  onDelete:(id:number)=>void
}

export default function ProductItem ({ product,onUpdate,onDelete }: ProductItemProps){
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isConfirmOpen,setConfirmOpen] = useState(false);
  const session = useSession();
  const accessToken = session.data?.accessToken;

  const handleUpdateProduct = async(data:any)=>{
    try{
      if(!accessToken) return;
      const result = await updateItem(product.id,accessToken,data);
      onUpdate(result.result);
      alert("Update thành công");
      setIsModalOpen(false);
    }catch(error: any){
      alert(error.message);
    }
  }
  const handleDeleteProduct = async()=>{
    console.log("Đã nhấn nút Delete");
    try{
      if(!accessToken) return;
      const res = await deleteItem(accessToken,product.id);
      onDelete(res.result);
      toast.success("Xoá sản phẩm thành công")
    }catch(error: any){
      alert(error.message);
    }
  }
  return (
    <div className="flex items-center justify-between bg-[#D9D9D9] p-4 rounded-sm mb-4">
      <div className="flex items-center flex-1">
        <div className="w-24 h-24 bg-white flex-shrink-0">
          {product.urlImg && (
            <img 
              src={product.urlImg} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          )}
        </div>
        <div className="grid grid-cols-3 flex-1 ml-10 text-sm font-medium text-gray-800">
          <div className="flex items-center justify-center">{product.name}</div>
          <div className="flex items-center justify-center">{product.price}</div>
          <div className="flex items-center justify-center">{product.inventoryQty}</div>
        </div>
      </div>
      <div className="flex items-center gap-6 ml-10 mr-4">
        <button className="hover:text-blue-600 transition-colors" onClick={()=>setIsModalOpen(true)}>
          <PencilLine size={32} strokeWidth={1.5} />
        </button>
        <button className="hover:text-red-600 transition-colors" onClick={()=>setConfirmOpen(true)}>
          <Trash2 size={32} strokeWidth={1.5} />
        </button>
      </div>
      <AddProductModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleUpdateProduct}
        initialData={product}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        title='Xoá sản phẩm'
        description='Bạn có chắc chắn muốn xoá sản phẩm này?'
        onConfirm={handleDeleteProduct}
        onClose={()=>setConfirmOpen(false)}
      />
    </div>
  );
};

