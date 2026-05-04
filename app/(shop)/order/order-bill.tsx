'use client'
import { CartDetailRes } from "@/components/cart/cart-detail";
import OrderItem from "@/components/order/order-item";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createOrder, OrderRequest } from "@/service/order.service";
import { useSession } from "next-auth/react";
import { useFormatter, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";


const OrderBill=()=>{
    const [items, setItems] = useState<CartDetailRes[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const session = useSession();
    const t = useTranslations('Order');
    const format = useFormatter();
    const accessToken = session.data?.accessToken;
    useEffect(() => {
        const savedItems = localStorage.getItem('checkoutItems');
        if (savedItems) {
        const parsedData = JSON.parse(savedItems);
        const standardizedData = Array.isArray(parsedData) ? parsedData : [parsedData];
        setItems(standardizedData);
        }
    }, []);
    const totalBill = items.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);

    const handleCreateOrder = async()=>{
      if(items.length==0) return;
      if (!accessToken) {
            toast.error(t('notLoggedIn'), {
                description: t('sessionExpired'),
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
        toast.success(t('paySuccess'), {
                // description: `Mã đơn hàng của bạn: ${result.orderId}`,
            });
        localStorage.removeItem('checkoutItems');
        router.push('/');
      }catch (error) {
            toast.error(t('payFailed'), {
                description: t('processError'),
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
            <p className="font-bold">{t('orderId')}:12345678</p>
            <h3 className="font-bold mb-2">{t('orderDate')}: {new Date().toLocaleDateString('vi-VN')}</h3>
        </div>
        {/* Header của bảng */}
        <div className="grid grid-cols-[100px_1fr_100px_150px_150px] gap-4 pb-4 mb-2 border-b-2 border-gray-200 text-sm font-bold text-gray-500 uppercase">
            <div>{t('colImage')}</div>
            <div>{t('colProduct')}</div>
            <div className="text-center">{t('colQty')}</div>
            <div className="text-right">{t('colPrice')}</div>
            <div className="text-right">{t('colTotal')}</div>
        </div>

        {/* Render danh sách */}
        {items.map((item) => (
            <OrderItem
                key={item.id}
                id={item.id}
                imgUrl={item.itemRes.urlImg}
                itemName={item.itemRes.name}
                quantity={item.quantity}
                price={item.purchasePrice}
                total={item.totalItem}
            />
        ))}
        <div>
            <p className="font-bold text-right mt-3 text-xl text-gray-500">{t('totalAmount')}: <span className="text-red-400">{format.number(totalBill)} VNĐ</span ></p>
        </div>
        </div>
        <div className="flex items-center justify-center mt-8">
        <Dialog>
          {/* DialogTrigger sẽ tự động mở Dialog khi nhấn vào Button bên trong */}
          <DialogTrigger asChild>
            <Button className="px-10 py-7 text-xl font-bold rounded-2xl shadow-lg hover:shadow-blue-200 transition-all active:scale-95 bg-blue-600 hover:bg-blue-700">
              {t('payNow')}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">{t('qrTitle')}</DialogTitle>
              <DialogDescription className="text-center text-gray-500">
                {t('qrDesc')}
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
                <p className="text-sm text-gray-400">{t('amountToPay')}</p>
                <p className="text-2xl font-black text-blue-600">{format.number(totalBill)} VNĐ</p>
              </div>
            </div>

            <DialogFooter className="sm:justify-center">
              <p className="text-xs text-gray-400 italic">
                {t('autoConfirm')}
              </p>
            </DialogFooter>
            <Button
              onClick={handleCreateOrder}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
                {loading ? t('processing') : t('complete')}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    
    );
}
export default OrderBill;