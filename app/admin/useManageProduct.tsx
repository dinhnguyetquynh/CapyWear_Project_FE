
import { getItems } from "@/service/item.service";
import { ItemRes } from "@/types/item";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useManageProduct =()=>{
    const { data: session, status } = useSession();
    const [listItems, setListItems] = useState<ItemRes[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchListItem = async () => {
            const accessToken = session?.accessToken;

            if (accessToken) {
                try {
                    setIsLoading(true);
                    const items = await getItems(0,10);
                    setListItems(items.content);
                } catch (err) {
                    console.error("Failed to fetch list item:", err);
                    setError("Không thể lấy dữ liệu sản phẩm.");
                    toast.error(error, {
                    description: 'Vui lòng kiểm tra lại đường truyền internet của bạn.',
                    });
                } finally {
                    setIsLoading(false);
                }
            } else if (status !== "loading") {
                // Nếu không còn loading mà cũng không có token
                setIsLoading(false);
            }
        };

        fetchListItem();
    }, [session?.accessToken, status]);

    return { listItems, isLoading, error };
}