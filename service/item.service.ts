import { ApiRes } from "@/types/general";
import { ItemReq, ItemRes, PageResponse, SearchSuggestion } from "@/types/item";

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

export const updateItem = async(itemId:number,token:string,req:ItemReq):Promise<ApiRes<ItemRes>>=>{
  const res = await fetch(`${API_URL}/${itemId}`,{
    method:"PATCH",
     headers:{
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(req),
  });
  if(!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || "Có lỗi xảy ra khi cập nhật sản phẩm");
  }
   const data:ApiRes<ItemRes> = await res.json();
   return data;
}

// api/item.ts
export const createItem = async (token: string, data: ItemReq): Promise<ApiRes<ItemRes>> => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Không thể thêm sản phẩm");
  }
  return await res.json();
};

export const deleteItem = async(token:string,itemId:number):Promise<ApiRes<number>>=>{
  const res = await fetch(`${API_URL}/${itemId}`,{
    method:"DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if(!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || "Không thể xoá sản phẩm");
  }
  return await res.json();
}

export const findItem = async (token: string, q: string): Promise<SearchSuggestion[]> => {
  const res = await fetch(`${API_URL}/search/suggest?q=${q}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Không thể tìm kiếm sản phẩm");
  }

  const data: ApiRes<SearchSuggestion[]> = await res.json();
  return data.result; 
}