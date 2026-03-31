export interface ItemRes{
    id: number;
    name: string;
    urlImg : string;
    price : number;
    inventoryQty:number;
}
export interface PageResponse<T> {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}