'use client'
import { useSession } from "next-auth/react";
import UserAccount from "../common/useraccount";

export default function HeaderAdmin(){
    const session = useSession();
    const userName = session.data?.username;
    return (
        <nav className="p-4 border-b flex justify-between items-center">
        <h1 className="font-bold">CapyBara Clothing</h1>
        <UserAccount 
            username={userName} 
            avatarUrl="" 
        />
        </nav>
  );
}