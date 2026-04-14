import OrderInfor from "@/components/admin/order-info";
import TitleItems from "@/components/common/title-order";
import OrderItem from "@/components/order/order-item";
import { OrderDetailDTO } from "@/service/order.service";

const mockOrders: OrderDetailDTO[] = [
  {
    id:1,
    imgUrl: "https://content.pancake.vn/1/s2360x2950/fwebp90/3a/85/76/63/0f2a3b1e0161cf6e7782dd2d0babb7f5b8a42b439f69c996c4a72f6b-w:3000-h:3750-l:868437-t:image/jpeg.jpeg", // Link ảnh mẫu
    itemName: "Áo sơ mi Oxford Button-Down",
    quantity: 2,
    price: 250000,
    total: 500000
  },
  {
    id:2,
    imgUrl: "https://content.pancake.vn/1/s2360x2950/fwebp90/3a/85/76/63/0f2a3b1e0161cf6e7782dd2d0babb7f5b8a42b439f69c996c4a72f6b-w:3000-h:3750-l:868437-t:image/jpeg.jpeg",
    itemName: "Quần Jeans Slim Fit Black",
    quantity: 1,
    price: 450000,
    total: 450000
  },
  {
    id:3,
    imgUrl: "https://content.pancake.vn/1/s2360x2950/fwebp90/3a/85/76/63/0f2a3b1e0161cf6e7782dd2d0babb7f5b8a42b439f69c996c4a72f6b-w:3000-h:3750-l:868437-t:image/jpeg.jpeg",
    itemName: "Giày Sneaker Casual White",
    quantity: 1,
    price: 890000,
    total: 890000
  }
];
export default function OrderPendingContainer(){
    return(
        <div className="border rounded-lg p-6">
            <OrderInfor/>
            <TitleItems/>
            {mockOrders.map((item)=>(
                <OrderItem key={item.id} {...item}/>
            ))

            }
        </div>
    )
}