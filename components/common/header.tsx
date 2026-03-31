import { Link } from "lucide-react";

export default function Header(){
    return(
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div>CLOTHING STORY</div>

        {/* <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/new-arrivals" className="hover:text-blue-600">Hàng mới</Link>
          <Link href="/nam" className="hover:text-blue-600">Nam</Link>
          <Link href="/nu" className="hover:text-blue-600">Nữ</Link>
        </nav> */}

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">🔍</button>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            🛒 <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </button>
        </div>
      </div>
    </header>
    );
}