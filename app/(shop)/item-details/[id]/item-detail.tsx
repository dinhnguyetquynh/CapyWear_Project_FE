'use client';

import { CartDetailRes } from "@/components/cart/cart-detail";
import { useCart } from "@/context/CartContext";
import { addToCartAction } from "@/service/cart.service";
import { ItemRes } from "@/types/item";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";
import { toast } from "sonner";
interface Props {
  item: ItemRes;
}
export default  function ItemDetail({item}:Props){
    const [count,setCount] = useState(1);
    const router = useRouter();
    const {data} = useSession();
    const { accessToken } = data || {}; 
    const isLoggedIn = !!data; 
    const { fetchCartCount } = useCart();

    const handleIncrement =()=>{
        setCount(prev=>prev+1);
    }
    const handleDecrement =()=>{
        if(count>1){
            setCount(prev=>prev-1)
        }
    }
    const protectedAction = async (actionType: 'add' | 'buy') => {
    if (!isLoggedIn) {
      toast.error("Bạn chưa đăng nhập",{
        description: "Vui lòng đăng nhập để thực hiện chức năng này.",
        action: {
            label: "Đăng nhập ngay",
            onClick: () => router.push('/login'),
        },
      });
      return;
    }

    if (actionType === 'add') {
      console.log("Thêm vào giỏ hàng:", count, item.name);
      console.log("ACCCESTOKEN:",accessToken);
      const res = await addToCartAction({ itemId: item.id, quantity: count }, accessToken);
      if(res.code==200){
        await fetchCartCount();
        toast.success("Thành công",{description:res.message});
      }else {
        toast.error("Thất bại", { description: res.message });
      }
    } else {
      console.log("Chuyển đến trang thanh toán với item:", item.name);
      const today = new Date().toISOString().split('T')[0];
      const props : CartDetailRes = {
        id:item.id,
        purchasePrice:item.price,
        quantity:count,
        totalItem:item.price*count,
        dateAdd:today,
        itemRes:item
      }
      localStorage.setItem('checkoutItems',JSON.stringify([props]));
      router.push("/order")
    }
  };

    return(
        <div className="flex flex-col md:flex-row gap-12">
            <div>
                <Image 
                    src={item.urlImg}
                    alt=""
                    width={600}
                    height={800}
                />
            </div>

            <div>
                <h3 className="font-bold text-3xl">{item.name}</h3>
                <h4 className="text-2xl mt-4">{item.price.toLocaleString("vi-VN")}đ</h4>
                <p className="mt-4 font-bold text-orange-700">Số lượng tồn kho : {item.inventoryQty}</p> 

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
                <div className="flex flex-col md:flex-row gap-4 mt-20">
                    <button 
                        onClick={()=> protectedAction('add')}
                        className="w-50 border py-2 rounded-lg bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition-colors duration-200"
                    >
                    Thêm vào giỏ hàng
                    </button>
                    <button 
                        onClick={()=> protectedAction('buy')}
                        className="w-50 border py-2 rounded-lg bg-gray-950 hover:bg-gray-950 active:bg-gray-950 transition-colors duration-200 text-amber-50"
                    >
                    Mua ngay
                    </button>
                </div>
            </div>

        </div>
    );
}