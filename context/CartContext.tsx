// context/CartContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { getCartList } from "@/service/cart.service";

interface CartContextType {
  cartCount: number;
  fetchCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;
  
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    if (!accessToken) return;
    try {
      const res = await getCartList(accessToken);
      if (res && res.result) {
        // LƯU Ý: Tùy thuộc vào cấu trúc trả về của API, bạn điều chỉnh logic đếm. 
        // Ví dụ: nếu res.result là mảng các chi tiết giỏ hàng:
        const count = Array.isArray(res.result) ? res.result.length : res.result.cartDetails?.length || 0;
        setCartCount(count);
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
    }
  };

  // Tự động gọi API lấy số lượng khi có accessToken (khi user đăng nhập)
  useEffect(() => {
    fetchCartCount();
  }, [accessToken]);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart phải được sử dụng bên trong CartProvider");
  }
  return context;
};