'use client';
import React, { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { ItemRes } from '@/types/item';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: ItemRes | null;
}

interface IFormData {
  name: string;
  imageFile: File | null; 
  price: number;
  inventoryQty: number;
}

export default function AddProductModal({ isOpen, onClose, onSubmit, initialData }: AddProductModalProps) {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    imageFile: null,
    price: 0,
    inventoryQty: 0
  });

  
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(isOpen){
      if(initialData){
        setFormData({
          name: initialData.name,
          imageFile: null, 
          price: initialData.price,
          inventoryQty: initialData.inventoryQty
        });
        setPreview(initialData.urlImg);
      }else{
        setFormData({ name: '', imageFile: null, price: 0, inventoryQty: 0 });
        setPreview('');
      }
    }
  },[isOpen,initialData]);

  // Xử lý dọn dẹp bộ nhớ khi preview thay đổi hoặc đóng modal
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, imageFile: file }));
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl); 
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const cloudName = "dxhhluk84"; 
    const uploadPreset = "my_preset_123"; 

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: data }
      );
      const resData = await response.json();
      return resData.secure_url; 
    } catch (error) {
      console.error("Lỗi upload Cloudinary:", error);
      return null;
    }
  };
  const handleConfirm = async () => {
    setLoading(true);
    let finalImageUrl = initialData?.urlImg || ""; 

    if (formData.imageFile) {
      const uploadedUrl = await uploadToCloudinary(formData.imageFile);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        alert("Upload ảnh thất bại!");
        setLoading(false);
        return;
      }
    } else if (!initialData) {
      alert("Vui lòng chọn ảnh!");
      setLoading(false);
      return;
    }
    
    const finalData = {
      name: formData.name,
      urlImg: finalImageUrl,
      price: formData.price,
      inventoryQty: formData.inventoryQty
    };

    onSubmit(finalData); 
    onClose();
    setLoading(false);
  };
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{initialData ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h2>
          <button onClick={onClose} className="hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
            <input 
              className="w-full border p-2 rounded focus:ring-2 focus:ring-amber-400 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Nhập tên sản phẩm..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hình ảnh sản phẩm</label>
            <input 
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
              onChange={handleFileChange}
            />
            
            {preview && (
              <div className="mt-3 relative w-32 h-32">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-md border shadow-sm" 
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Giá (VNĐ)</label>
              <input 
                type="number"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-amber-400 outline-none"
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                value={formData.price}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Số lượng tồn</label>
              <input 
                type="number"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-amber-400 outline-none"
                onChange={(e) => setFormData({...formData, inventoryQty: Number(e.target.value)})}
                value={formData.inventoryQty}
              />
            </div>
          </div>
          
          <button 
            onClick={handleConfirm}
            disabled={loading} // Khóa nút khi đang upload
            className="w-full bg-amber-400 text-black font-bold p-3 rounded mt-4 hover:bg-amber-500 flex justify-center items-center"
          >
            {loading ? (
            <><Loader2 className="animate-spin mr-2" /> ĐANG TẢI ẢNH...</>
          ) : (
            initialData ? "CẬP NHẬT" : "XÁC NHẬN THÊM"
          )}
          </button>
        </div>
      </div>
    </div>
  );
}