import { redirect } from "next/navigation";

export default function RootPage() {
  // Tự động chuyển hướng sang trang sản phẩm
  redirect("/products");
}