// components/item/pagination.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaginationInner({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 border rounded ${
          currentPage === 0 ? "pointer-events-none opacity-50" : "hover:bg-gray-100"
        }`}
      >
        Previous
      </Link>

      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={createPageURL(i)}
          className={`px-4 py-2 border rounded ${
            currentPage === i ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </Link>
      ))}

      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 border rounded ${
          currentPage >= totalPages - 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-100"
        }`}
      >
        Next
      </Link>
    </div>
  );
}

// Export component bọc Suspense — dùng ở nơi khác như bình thường
export default function Pagination(props: { currentPage: number; totalPages: number }) {
  return (
    <Suspense fallback={null}>
      <PaginationInner {...props} />
    </Suspense>
  );
}