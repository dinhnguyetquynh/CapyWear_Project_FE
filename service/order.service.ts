'use server';
import { ApiRes } from "@/types/general";

export interface OrderRequest{
    items: ItemRequest[];
}

export interface ItemRequest{
    itemId:number;
    quantity:number;
}
export interface OrderRespone{
    orderId:number;
    orderDate:string;
    totalOrder:number;
    status:string;
    details:OrderDetailDTO[];
}
export interface OrderDetailDTO{
    id:number;
    imgUrl:string;
    itemName:string;
    quantity:number;
    price:number;
    total:number;
}


export const createOrder = async(o:OrderRequest,token:string):Promise<OrderRespone>=>{
    const backendUrl = process.env.BACKEND_API_URL;
    console.log("BACKEND URL"+backendUrl);
    try{
        const response = await fetch(`${backendUrl}/api/order`,{
            method:"POST",
            headers:{
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(o),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Có lỗi xảy ra khi tạo đơn hàng");
        }

        const data:ApiRes<OrderRespone> = await response.json();
        return data.result;

    }catch (error) {
        console.error("Lỗi khi gọi API createOrder:", error);
        throw error;
    }
};

export const getOrderHistory = async(token:string):Promise<OrderRespone[]>=>{
    const backendUrl = process.env.BACKEND_API_URL;
    console.log("BACKEND URL"+backendUrl);
    try{
        const response = await fetch(`${backendUrl}/api/order/history`,{
            method:"GET",
            headers:{
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Có lỗi xảy ra khi tải lịch sử đơn hàng");
        }

        const data:ApiRes<OrderRespone[]> = await response.json();
        return data.result;

    }catch (error) {
        console.error("Lỗi khi gọi API getOrderHistory:", error);
        throw error;
    }
}