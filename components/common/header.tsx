"use client";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useSession } from "next-auth/react";
import handleLogout from "@/service/general.service";
import { useEffect, useRef, useState } from "react";
import { findItem } from "@/service/item.service";
import { SearchSuggestion } from "@/types/item";

export default function Header(){
  const session = useSession();
  const userName = session.data?.username;
  const [searchQuery, setSearchQuery] = useState("");
const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accessToken = session.data?.accessToken;

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        try {
          if(!accessToken) return;
          const result = await findItem(accessToken, searchQuery);
          console.log("Kết quả nhận được:", result);
          setSuggestions(result || []);
          setIsOpen(true);
        } catch (error) {
          console.error("Lỗi khi tìm kiếm:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery,accessToken]);

  // 2. Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    return(
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div>CAPYBARA CLOTHING</div>
        </Link>
        <div className="relative flex-1 max-w-md hidden md:block" ref={dropdownRef}>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setIsOpen(true)}
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-black transition-all outline-none text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>

          {/* Hiển thị kết quả gợi ý */}
          {isOpen && suggestions.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border rounded-xl shadow-lg z-50 overflow-hidden py-2">
              {suggestions.map((item) => (
                  <Link
                    key={item.id} 
                    href={`/item-details/${item.id}`}
                    onClick={() => {
                      setIsOpen(false);
                      setSearchQuery(""); 
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* <button className="p-2 hover:bg-gray-100 rounded-full">🔍</button> */}
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
                👤{userName}
              </button>
            </DropdownMenuTrigger>
            {/* align="end" giúp menu xổ xuống căn sang mép phải, không bị tràn ra ngoài màn hình */}
            <DropdownMenuContent align="end" className="w-48 mt-2 rounded-xl">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile" className="w-full">
                  Tài khoản của tôi
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/history" className="w-full">
                  Đơn hàng của tôi
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout} 
                className="cursor-pointer text-red-600 focus:text-red-600">
                  Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        
        </div>
      </div>
    </header>
    );
}