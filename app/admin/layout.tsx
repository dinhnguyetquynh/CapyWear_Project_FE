import HeaderAdmin from "@/components/admin/header";
import SidebarAdmin from "@/components/admin/sidebar";
import Sidebar from "@/components/common/sidebar";
import React from "react";

export default function AdminLayout({children}:{children:React.ReactNode}){
    return(
        <div className="flex flex-col min-h-screen">
            <HeaderAdmin/>
            <div className="flex flex-1 gap-8">
                    <aside className="hidden md:block w-50 shrink-0 mt-2 ml-1">
                      <SidebarAdmin/>
                    </aside>
                    <main className="flex-1">
                      {children}
                    </main>
            </div>
        </div>
    )
}