'use client'
import { getCartList } from "@/actions/cart";
import CartDetail, { CartDetailRes } from "@/components/cart/cart-detail";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ListCartDetail(){
    const router = useRouter();

    const session = useSession();
 
    console.log("Session lấy tại Server:", session);

    const accessToken = session.data?.accessToken;
    
    const[cartItems, setCartItems] = useState<CartDetailRes[]>([]);
    const[selectedIds,setSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
        if (accessToken) {
            try {
                const response = await getCartList(accessToken);
                setCartItems(response.result || []);
            } catch (error) {
                console.error("Lỗi lấy giỏ hàng:", error);
            } finally {
                setLoading(false); 
            }
        } else if (session.status === "unauthenticated") {
            setLoading(false); 
        }
    };

    fetchData(); // <--- PHẢI GỌI HÀM NÀY THÌ NÓ MỚI CHẠY!
}, [accessToken, session.status]); 

    const toggleSelect = (id: number)=>{
        setSelectedIds(prev=>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        )
    }
    const totalPrice = cartItems
        .filter(item => selectedIds.includes(item.id))
        .reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);//reduce là thu gọn lại thành 1 tổng 

    const handleCheckout = () => {
        if (selectedIds.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng!");
            return;
        }
        const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
        localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
        router.push('/order');
    };
    const handleDeleteFromState = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
        setSelectedIds(prev => prev.filter(itemId => itemId !== id));
    };
    if (loading) return <div>Đang tải giỏ hàng...</div>;
    return(
        <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Giỏ hàng của bạn</h1>

        {cartItems.length === 0 ? (
            <div className="py-20 text-center border rounded-lg bg-gray-50">
            <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-6">
            {/* 4. Duyệt danh sách và hiển thị */}
            {cartItems.map((item: any) => (
                <CartDetail 
                    key={item.id} 
                    cd={item} 
                    accessToken={accessToken}
                    isSelected={selectedIds.includes(item.id)}
                    onSelect={() => toggleSelect(item.id)}
                    onUpdateQuantity={(newQty) => {           
                    const newCart = cartItems.map(c => 
                        c.id === item.id ? {...c, quantity: newQty} : c
                    );
                    setCartItems(newCart); 
                    }}
                    onDeleteSuccess ={handleDeleteFromState}
                />
            ))}

            <div className="mt-6 flex flex-col items-end border-t pt-6">
                        <div className="text-xl mb-4">
                            Tổng cộng ({selectedIds.length} món): 
                            <span className="text-red-600 font-bold ml-2">
                                {totalPrice.toLocaleString()} VNĐ
                            </span>
                        </div>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition" onClick={handleCheckout}>
                            Đặt hàng
                        </button>
                    </div>
            </div>  
        )}
        </main>
    );

}