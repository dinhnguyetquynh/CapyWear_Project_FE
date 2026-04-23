//container
'use client'
import { getOrderHistory, OrderRespone } from "@/service/order.service";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { useOrderHistory } from "./useOrderHistory";
import HistoryOrder from "./history-order";

export default function HistoryOrderContainer(){
    const { listOrderHistory, isLoading, error } = useOrderHistory();

    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>{error}</div>;

    return(
        <div>
            <Suspense>
                 <HistoryOrder orders={listOrderHistory}/>
            </Suspense>
        </div>
    );
}