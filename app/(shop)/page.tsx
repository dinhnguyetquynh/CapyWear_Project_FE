import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default function RootPage() {
  // Tự động chuyển hướng sang trang sản phẩm
  redirect("/products");
}

