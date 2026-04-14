import React from 'react';
import { User } from 'lucide-react'; // Import icon user
import Image from 'next/image';

interface UserAccountProps {
  username: string;
  avatarUrl?: string;
}

const UserAccount: React.FC<UserAccountProps> = ({ username, avatarUrl }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer w-fit">
      <div className="relative w-9 h-9 overflow-hidden bg-gray-200 rounded-full flex items-center justify-center border border-gray-300">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={username}
            fill
            className="object-cover"
          />
        ) : (
          <User className="text-gray-500 w-5 h-5" />
        )}
      </div>
      <span className="text-sm font-medium text-gray-700 hidden sm:block">
        {username}
      </span>
    </div>
  );
};

export default UserAccount;