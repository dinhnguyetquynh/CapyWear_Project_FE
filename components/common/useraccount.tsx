"use client"; 
import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react'; // Import thêm icon LogOut
import Image from 'next/image';
import { signOut } from 'next-auth/react'; // 2. Import signOut
import ConfirmModal from './confirm-modal';

interface UserAccountProps {
  username?: string;
  avatarUrl?: string;
}

const UserAccount: React.FC<UserAccountProps> = ({ username, avatarUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/login" });
    setIsLoading(false);
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center gap-3 p-1 pr-3 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors w-fit group">
      {/* Avatar Section */}
      <div className="relative w-8 h-8 overflow-hidden bg-white rounded-full flex items-center justify-center border border-gray-300">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={username || 'default'}
            fill
            className="object-cover"
          />
        ) : (
          <User className="text-gray-500 w-4 h-4" />
        )}
      </div>

      {/* Username Section */}
      <span className="text-sm font-semibold text-gray-700 hidden sm:block">
        {username}
      </span>

      {/* 4. Logout Button - Chỉ hiện rõ khi hover vào component */}
      <button
        onClick={openModal}
        title="Đăng xuất"
        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
      >
        <LogOut className="w-4 h-4" />
      </button>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Xác nhận đăng xuất"
        description="Bạn có chắc chắn muốn thoát khỏi phiên làm việc này không?"
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLogout}
        loading={isLoading}
      />
    </div>
  );
};

export default UserAccount;