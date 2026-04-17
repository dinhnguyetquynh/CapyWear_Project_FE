'use client'
import OrderInfor from "@/components/admin/order-info";
import OrderPendingContainer from "./order-pending-container";
import { useOrderPending } from "./useOrderPending";

export default function ListOrderPending(){
    const{listOrderPending,isLoading,error}= useOrderPending();
    if(isLoading) return <div>Đang tải dữ liệu...</div>
    if (error) return <div>{error}</div>;
    return(
        <div>
            <OrderPendingContainer orders={listOrderPending}/>
        </div>
    );
}