import { getAccessToken } from "@/service/auth.service";
import ListCartDetail from "./list-cart";
import { getCartList } from "@/service/cart.service";

export const dynamic = "force-dynamic";

export default async function Page() {
  
  const res = await getCartList();
  const data = res.result;

  return <ListCartDetail initialItems={data} />;
}