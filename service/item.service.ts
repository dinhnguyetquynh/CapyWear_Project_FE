import { ApiRes } from "@/types/general";
import { ItemReq, ItemRes, PageResponse, SearchSuggestion } from "@/types/item";

const API_URL =process.env.BACKEND_API_URL || "https://capywear-project.onrender.com";
const API_FE ="https://capy-wear-project-fe.vercel.app";
export const getItemDetail = async(itemId : number):Promise<ApiRes<ItemRes>> =>{
  const res = await fetch(`${API_FE}/api/v1/items/${itemId}`, {
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("Sản phẩm không tồn tại");
    throw new Error("Không thể lấy chi tiết sản phẩm");
  }

  return res.json();
}

export const updateItem = async(itemId:number,token:string,req:ItemReq):Promise<ApiRes<ItemRes>>=>{
  const res = await fetch(`${API_URL}/api/item/${itemId}`,{
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
  const res = await fetch(`${API_URL}/api/item/`, {
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
  const res = await fetch(`${API_URL}/api/item/${itemId}`,{
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
  const res = await fetch(`${API_URL}/api/item/search/suggest?q=${q}`, {
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

export const getItems = async (
  page = 0, 
  size = 10, 
  minPrice?: number, 
  maxPrice?: number
): Promise<PageResponse<ItemRes>> => {
  
  // 1. Tạo đối tượng URLSearchParams để quản lý query params
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  // 2. Chỉ thêm minPrice và maxPrice vào URL nếu chúng có giá trị
  if (minPrice !== undefined && minPrice !== null) {
    params.append("minPrice", minPrice.toString());
  }
  if (maxPrice !== undefined && maxPrice !== null) {
    params.append("maxPrice", maxPrice.toString());
  }

  // 3. Gọi fetch với query string đã được tạo tự động
  console.log('API URL :'+API_URL);
  const res = await fetch(`${API_FE}/api/v1/items?${params.toString()}`, {
    next: { revalidate: 60 }, 
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách sản phẩm");
  }

  return res.json();
};