'use client'
import { getOrderPending, OrderPendingRes } from "@/service/order.service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";


export const useOrderPending = () => {
    const { data: session } = useSession();
    const key = session?.accessToken ? ['/api/orders/pending', session.accessToken] : null;
    const fetcher = ([, token]: [string, string]) => getOrderPending(token);

    const { data, error, isLoading, mutate } = useSWR<OrderPendingRes[]>(key, fetcher, {
        revalidateOnFocus: true, 
        refreshInterval: 30000,  
        dedupingInterval: 5000,  
    });

    return { 
        listOrderPending: data || [], 
        isLoading: !data && !error, 
        error,
        mutate 
    };
}