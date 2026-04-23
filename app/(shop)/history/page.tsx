//container
'use client'
import { Suspense, useEffect, useState } from "react";
import { useOrderHistory } from "./useOrderHistory";
import HistoryOrder from "./history-order";

const HistoryOrderContainer = () => {
    const { listOrderHistory, isLoading, error } = useOrderHistory();

    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <HistoryOrder orders={listOrderHistory}/>
        </div>
    );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HistoryOrderContainer />
    </Suspense>
  );
}