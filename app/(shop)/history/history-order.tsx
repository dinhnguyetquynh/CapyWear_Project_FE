//form
import OrderItem from "@/components/order/order-item"
import { OrderRespone } from "@/service/order.service"

export default function HistoryOrder({ orders }: { orders: OrderRespone[] }){
    
    return(
        <div>
           <div>
                <div className="mb-4 text-center font-bold">LỊCH SỬ ĐƠN HÀNG</div>
                  {orders.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        Bạn chưa có đơn hàng nào
                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order.orderId}
                            className="border border-gray-300 p-4 rounded-2xl mb-4 pb-2"
                        >
                            <div>Mã Order: {order.orderId}</div>
                            <div>Ngày Order: {order.orderDate}</div>

                            <div>
                                Trạng thái:
                                <span className="text-red-500 ml-1">
                                    {
                                        order.status == 'PENDING'
                                            ? 'Đang giao hàng'
                                            : 'Đã giao hàng'
                                    }
                                </span>
                            </div>

                            {order.details.map((item) => (
                                <OrderItem
                                    key={item.id}
                                    {...item}
                                />
                            ))}

                            <div className="text-right text-lg">
                                Tổng tiền :
                                <span className="text-red-500">
                                    {" "}
                                    {order.totalOrder.toLocaleString("vi")} VND
                                </span>
                            </div>
                        </div>
                    ))
                )}

           </div>
        </div>
    )
}