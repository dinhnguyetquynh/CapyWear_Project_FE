import OrderInfor from "@/components/admin/order-info";
import TitleItems from "@/components/common/title-order";
import OrderItem from "@/components/order/order-item";
import { OrderDetailDTO, OrderPendingRes } from "@/service/order.service";


export default function OrderPendingContainer({orders}:{orders:OrderPendingRes[]}){
    return(
        <div>
          <div className="font-bold text-2xl mb-4 mt-4 text-center text-gray-600">ĐƠN HÀNG MỚI</div>
          {orders.map((o)=>(
            <OrderInfor key={o.orderId} order={o}/>
          ))}
          <div></div>
        </div>
    )
}