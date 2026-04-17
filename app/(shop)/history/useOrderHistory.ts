//hook
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getOrderHistory, OrderRespone } from "@/service/order.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useOrderHistory = () => {
    const { data: session, status } = useSession();
    const [listOrderHistory, setListOrderHistory] = useState<OrderRespone[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

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
                    toast.error(error, {
                    description: 'Vui lòng kiểm tra lại đường truyền internet của bạn.',
                    });
                } finally {
                    setIsLoading(false);
                }
            } else if (status !== "loading") {
                setIsLoading(false);
                router.push("/login");
            }
        };

        fetchOrderHistory();
    }, [session?.accessToken, status]);

    return { listOrderHistory, isLoading, error };
};