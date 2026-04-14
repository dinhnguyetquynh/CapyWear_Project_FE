"use client";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function Header(){
    return(
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div>CAPYBARA CLOTHING</div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">🔍</button>
          {/* <Link href="/cart">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
            🛒 <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </button>
          </Link> */}
          <Link 
            href="/cart" 
            className="p-2 hover:bg-gray-100 rounded-full relative flex items-center justify-center"
          >
            🛒 
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                title="Tài khoản"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center border border-transparent active:border-gray-200 outline-none"
              >
                👤
              </button>
            </DropdownMenuTrigger>
            {/* align="end" giúp menu xổ xuống căn sang mép phải, không bị tràn ra ngoài màn hình */}
            <DropdownMenuContent align="end" className="w-48 mt-2 rounded-xl">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/account" className="w-full">
                  Tài khoản của tôi
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/history" className="w-full">
                  Đơn hàng của tôi
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        
        </div>
      </div>
    </header>
    );
}