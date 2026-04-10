'use client'
import { CartDetailRes } from "@/components/cart/cart-detail";
import OrderItem from "@/components/order/order-item";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createOrder, OrderRequest } from "@/service/order.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function OrderBill(){
    const [items, setItems] = useState<CartDetailRes[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const session = useSession();
    const accessToken = session.data?.accessToken;
    useEffect(() => {
        const savedItems = localStorage.getItem('checkoutItems');
        if (savedItems) {
        setItems(JSON.parse(savedItems));
        }
    }, []);
    const totalBill = items.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);

    const handleCreateOrder = async()=>{
      if(items.length==0) return;
      if (!accessToken) {
            toast.error("Chưa đăng nhập", {
                description: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
            });
            return;
        }
      try{
        setLoading(true);
        
        const orderRequest : OrderRequest ={
          items: items.map(item => ({
                    itemId: item.itemRes.id, // Lấy ID của sản phẩm
                    quantity: item.quantity
          }))
        };
        
        const result = await createOrder(orderRequest,accessToken);
        toast.success("Thanh toán thành công!", {
                // description: `Mã đơn hàng của bạn: ${result.orderId}`,
            });
        localStorage.removeItem('checkoutItems');
        router.push('/');
      }catch (error) {
            toast.error("Tạo đơn hàng thất bại", {
                description: "Đã có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại.",
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return(
    <div>
        <div className="max-w-full mx-auto p-4 bg-white rounded-xl shadow-sm">
        <div className="text-gray-500">
            <p className="font-bold">Mã đơn hàng:12345678</p>
            <h3 className="font-bold mb-2">Ngày đặt hàng: 4/8/2026</h3>
        </div>
        {/* Header của bảng */}
        <div className="grid grid-cols-[100px_1fr_100px_150px_150px] gap-4 pb-4 mb-2 border-b-2 border-gray-200 text-sm font-bold text-gray-500 uppercase">
            <div>Hình ảnh</div>
            <div>Sản phẩm</div>
            <div className="text-center">SL</div>
            <div className="text-right">Đơn giá</div>
            <div className="text-right">Tổng</div>
        </div>

        {/* Render danh sách */}
        {items.map((item) => (
            <OrderItem
                key={item.id}
                img={item.itemRes.urlImg}
                itemName={item.itemRes.name}
                quantity={item.quantity}
                price={item.purchasePrice}
                total={item.totalItem}
            />
        ))}
        <div>
            <p className="font-bold text-right mt-3 text-xl text-gray-500">Tổng tiền : <span className="text-red-400">{totalBill.toLocaleString()} VNĐ</span ></p>
        </div>
        </div>
        <div className="flex items-center justify-center mt-8">
        <Dialog>
          {/* DialogTrigger sẽ tự động mở Dialog khi nhấn vào Button bên trong */}
          <DialogTrigger asChild>
            <Button className="px-10 py-7 text-xl font-bold rounded-2xl shadow-lg hover:shadow-blue-200 transition-all active:scale-95 bg-blue-600 hover:bg-blue-700">
              Thanh toán ngay
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Thanh toán qua QR</DialogTitle>
              <DialogDescription className="text-center text-gray-500">
                Mở ứng dụng Ngân hàng hoặc Ví điện tử để quét mã
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center py-6">
              {/* Giả lập khung QR */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-white p-4 rounded-xl border-2 border-gray-100">
                   {/* Bạn có thể dùng img src từ VietQR API ở đây */}
                   <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PAYMENT_INFO_HERE`} 
                    alt="QR Code"
                    className="w-56 h-56"
                   />
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">Số tiền cần thanh toán</p>
                <p className="text-2xl font-black text-blue-600">200.000đ</p>
              </div>
            </div>

            <DialogFooter className="sm:justify-center">
              <p className="text-xs text-gray-400 italic">
                Hệ thống sẽ tự động xác nhận sau khi nhận được tiền.
              </p>
            </DialogFooter>
            <Button
              onClick={handleCreateOrder}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
                {loading?"Đang xử lý":"Hoàn thành"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    
    );
}