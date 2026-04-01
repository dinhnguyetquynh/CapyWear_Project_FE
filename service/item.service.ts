import { ApiRes } from "@/types/general";
import { ItemRes, PageResponse } from "@/types/item";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/item";

export const getItems = async (page = 0, size = 10):Promise<PageResponse<ItemRes>> => {
  const res = await fetch(`${API_URL}?page=${page}&size=${size}`, {
    // Next.js sẽ lưu cache dữ liệu này. 
    // revalidate: 60 nghĩa là sau 60s nó mới kiểm tra xem backend có gì mới không.
    next: { revalidate: 60 }, 
  });

  if (!res.ok) throw new Error("Không thể lấy danh sách sản phẩm");
  
  return res.json();
};

export const getItemDetail = async(itemId : number):Promise<ApiRes<ItemRes>> =>{
  const res = await fetch(`${API_URL}/${itemId}`, {
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("Sản phẩm không tồn tại");
    throw new Error("Không thể lấy chi tiết sản phẩm");
  }

  return res.json();
}
