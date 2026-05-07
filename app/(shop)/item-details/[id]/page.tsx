import { getItemDetail } from "@/service/item.service";
import ItemDetail from "./item-detail";
interface PageProps{
  params : {id:string};
}
export default async function ItemDetailPage({ params }: PageProps) {
    const { id } = await params;

    const res = await getItemDetail(Number(id));
    const item = res.result;

    return (
        <main className="container mx-auto py-10">
           <ItemDetail item={item}/>
        </main>
    );
}