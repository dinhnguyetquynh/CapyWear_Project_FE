//hook
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getOrderHistory, OrderRespone } from "@/service/order.service";

export const useOrderHistory = () => {
    const { data: session, status } = useSession();
    const [listOrderHistory, setListOrderHistory] = useState<OrderRespone[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const accessToken = session?.accessToken;

            if (accessToken) {
                try {
                    setIsLoading(true);
                    const orders = await getOrderHistory(accessToken);
                    setListOrderHistory(orders);
                } catch (err) {
                    console.error("Failed to fetch order history:", err);
                    setError("Không thể lấy dữ liệu đơn hàng.");
                } finally {
                    setIsLoading(false);
                }
            } else if (status !== "loading") {
                // Nếu không còn loading mà cũng không có token
                setIsLoading(false);
            }
        };

        fetchOrderHistory();
    }, [session?.accessToken, status]);

    return { listOrderHistory, isLoading, error };
};