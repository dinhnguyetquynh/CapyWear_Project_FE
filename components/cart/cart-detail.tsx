'use client';

import { useCart } from "@/context/CartContext";
import { ItemRes } from "@/types/item";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface CartDetailRes{
    id : number;
    purchasePrice: number;
    quantity: number;
    totalItem:number;
    dateAdd: string;
    itemRes :ItemRes;
}
interface CartDetailProps{
    cd: CartDetailRes;
    isSelected: boolean;
    onSelect: () => void;
    onUpdateQuantity: (newQuantity: number) => void;
    onDeleteSuccess: (id: number) => void;
}
export default function CartDetail({ cd, isSelected, onSelect, onUpdateQuantity,onDeleteSuccess}: CartDetailProps){
    const [count,setCount] = useState(cd.quantity);
    const [price,setPrice] = useState(cd.totalItem);
    const { fetchCartCount } = useCart();

    const t = useTranslations('Cart');
    const format = useFormatter();
    
    const router = useRouter();
    const handleDecrement =()=>{
        if(count>1){
            const newCount = count-1;
            setCount(newCount);
            setPrice(price-(cd.purchasePrice));
            onUpdateQuantity(newCount);
        }
    };
    const handleIncrement=()=>{
        const newCount = count + 1;
        setCount(newCount);
        setPrice(price+(cd.purchasePrice));
        onUpdateQuantity(newCount);
    };
    // const deleteItem = async (cdId: number) => {
    //     try {
    //         const response = await deleteCartItemAction(cdId, accessToken);
    //         if (response.code === 200) {
    //             await fetchCartCount();
    //             alert(t('deleteSuccess'));
    //             onDeleteSuccess(cdId);
    //         } else {
    //             alert(response.message || t('errorOccurred'));
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi xóa:", error);
    //     }
    // };
    return(
        <div className="flex gap-6 items-start p-4 border-b border-t-gray-100 transition-colors ${isSelected?'bg-blue-50/50' : 'bg-white'}">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onSelect}
                    className="w-5 h-5 cursor-pointer accent-red-600 rounded border-gray-300 focus:ring-red-500"
                />
            </div>
            <div className="w-64 h-64 flex-shrink-0 overflow-hidden rounded-md border">
                <Image src={cd.itemRes.urlImg} width={500} height={500} alt={""} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{cd.itemRes.name}</h2>
                    <h4 className="text-red-600 font-medium text-lg">{format.number(price)} VNĐ</h4>
                </div>
               
                <div className="flex items-center border border-gray rounded-lg w-fit overflow-hidden">
                    <button
                        onClick={handleDecrement} 
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200"
                        disabled={count<=1}
                    >
                        -
                    </button>
                    <input 
                        type="number" 
                        value={count} 
                        readOnly
                        className="w-12 text-center border-x border-gray-300 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button 
                        onClick={handleIncrement}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200"
                    >
                        +
                    </button>
                </div>

               <div className="mt-auto">
                    <button
                        // onClick={()=>deleteItem(cd.id)} 
                        className="text-sm text-gray-500 hover:text-red-500 underline transition-colors"
                    >
                       {t('deleteItem')}
                    </button>
                </div>
            </div>
        </div>
    )
}