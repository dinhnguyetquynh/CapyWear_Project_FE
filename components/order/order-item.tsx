import { OrderDetailDTO } from "@/types/order";
import Image from "next/image";
export default function OrderItem(order:OrderDetailDTO){
    return(
        <div className="grid grid-cols-[100px_1fr_100px_150px_150px] gap-4 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">
            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">
                <Image src={order.img} width={500} height={500} alt={""} />
            </div>
            {/* Cột 1: Tên sản phẩm */}
            <div className="font-medium text-gray-800 truncate" title={''}>
                {order.itemName} 
            </div>

            {/* Cột 2: Số lượng */}
            <div className="text-center text-gray-600">
                <span className="text-xs text-gray-400 mr-1">x</span>
                {order.quantity} 
            </div>

            {/* Cột 3: Đơn giá */}
            <div className="text-right text-gray-600">
                {order.price}
            </div>

            {/* Cột 4: Thành tiền */}
            <div className="text-right font-semibold text-blue-600">
                {order.total}
            </div>
    </div>
    )
}