import { getItemDetail } from "@/service/item.service";
import { notFound } from "next/navigation";
import ItemDetail from "./item-detail";
import ItemDetailContainer from "./item-detail-container";


interface PageProps{
  params : {id:string};
}
export default async function ItemDetailPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <main className="container mx-auto py-10">
            <ItemDetailContainer itemId={id} />
        </main>
    );
}