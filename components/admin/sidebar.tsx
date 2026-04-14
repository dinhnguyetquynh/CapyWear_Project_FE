import Link from "next/link";

export default function SidebarAdmin(){
    return (
    <aside className="w-50 h-screen border-r border-gray-200 bg-white flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 ">Quản lý sản phẩm</h2>
        <nav className="flex flex-col gap-2">
          <Link 
            href="/admin" 
            className="text-gray-700 hover:text-black hover:bg-gray-50 px-3 py-2 rounded-md transition-colors font-medium"
          >
            Quản lý sản phẩm
          </Link>
          
          <Link 
            href="/admin/orders" 
            className="text-gray-700 hover:text-black hover:bg-gray-50 px-3 py-2 rounded-md transition-colors font-medium"
          >
            Quản lý đơn hàng
          </Link>
        </nav>
      </div>
    </aside>
  );
}