import { getItemDetail } from "@/service/item.service";
import { notFound } from "next/navigation";
import ItemDetail from "./item-detail";


interface PageProps{
  params : {id:string};
}
export default async function ItemDetailPage({params}:PageProps){
    try{
        const { id } = await params;
        console.log(`PARAM IS: ${id}`); // Bây giờ id sẽ có giá trị
        const itemId = parseInt(id);
       
        const respone = await getItemDetail(itemId);
        if(!respone.result){
            return notFound();
        }

        return(
            <main className="container mx-auto py-10">
                <ItemDetail item={respone.result}/>
            </main>
        );
    }catch(error){
        console.error("Lỗi khi tải sản phẩm:", error);
        return notFound();
    }
    
    
}