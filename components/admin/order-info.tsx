'use client'
import { changeStatusOrder, OrderPendingRes } from "@/service/order.service";
import TitleItems from "../common/title-order";
import OrderItem from "../order/order-item";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function OrderInfor( { order }: { order: OrderPendingRes }){
    const[status,setStatus]=useState(order.status);
    const session = useSession();
    const accessToken = session.data?.accessToken;
    const handleChangeStatus = () => {
    if (status === "PENDING") {
        if(!accessToken) return;
        const result = changeStatusOrder(accessToken,order.orderId);
        setStatus("DELIVERED");
    }
    };
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("vi-VN");
    };
    return(
    <div className="border rounded-lg p-4 mb-4">
        <div className="flex flex-row justify-between items-start p-4 border rounded-lg">
            <div className="div1">
                <h2 className="font-bold text-lg mb-2">THÔNG TIN ĐƠN HÀNG</h2>
                <p><span className="font-semibold">Mã đơn hàng: </span>{order.orderId}</p>
                <p><span className="font-semibold">Email khách hàng: </span>{order.userEmail}</p>
                <p><span className="font-semibold">Ngày đặt: </span>{formatDate(order.orderDate)}</p>
                <p>
                    <span className="font-semibold">Tổng tiền: </span>
                    <span className="font-semibold text-red-700">{order.totalOrder.toLocaleString("vi")}VND</span>
                </p>
            </div>

            <div className="div2">
                <p className="mb-2">
                    <span className="font-semibold text-blue-600">Trạng thái: </span>
                    <span className={`font-semibold
                        ${status === "PENDING" ? "text-orange-400" : "text-green-600"}`}
                    >
                        {status  === "PENDING" ? "ĐANG XỬ LÝ" : "ĐÃ GIAO"}
                    </span>
                </p>

                {status  === "PENDING" && (
                    <button
                        onClick={handleChangeStatus}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={status !== "PENDING"}
                    >
                        Xác nhận đã giao
                    </button>
                )}
            </div>
        </div>
        <div>
            <TitleItems/>
        </div>
        <div>
            {order.details.map((item)=>(
                <OrderItem key={item.id} {...item}/>
            ))}
        </div>
        <div><br /></div>
    </div>

    )
}