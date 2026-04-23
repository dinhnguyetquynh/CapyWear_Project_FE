import { Suspense } from "react";
import OrderBill from "./order-bill";

export const dynamic = "force-dynamic";
export default function OrderBillPage(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <OrderBill/>
    </Suspense>
  )
}