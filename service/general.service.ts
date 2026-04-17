"use client";

import { signOut } from "next-auth/react";

const handleLogout = () => {
  signOut({ 
    callbackUrl: "/login", // Trang sẽ chuyển đến sau khi đăng xuất thành công
    redirect: true 
  });
};
export default handleLogout;

