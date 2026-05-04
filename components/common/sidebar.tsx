"use client";
const PRICE_RANGES = [
  { labelKey: "under500", min: "0", max: "500000" },
  { labelKey: "500to1", min: "500000", max: "1000000" },
  { labelKey: "1to2", min: "1000000", max: "2000000" },
  { labelKey: "above2", min: "2000000", max: "" },
];



import { useTranslations } from "next-intl";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Sidebar() {
  const t = useTranslations("Sidebar");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Lấy giá trị hiện tại trên URL để check vào checkbox tương ứng
  const currentMin = searchParams.get("minPrice");
  const currentMax = searchParams.get("maxPrice");

  const handlePriceChange = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Nếu người dùng click vào cái đang được chọn -> Bỏ lọc (Reset)
    if (currentMin === min && currentMax === max) {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      // Nếu chọn cái mới -> Cập nhật param
      if (min) params.set("minPrice", min); else params.delete("minPrice");
      if (max) params.set("maxPrice", max); else params.delete("maxPrice");
    }

    // Reset về trang 0 khi lọc
    params.set("page", "0");
    
    // Đẩy param lên URL
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6 bg-white p-4 rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">{t("filterPrice")}</h3>
        <div className="space-y-3 text-sm text-gray-600">
          {PRICE_RANGES.map((range) => (
            <label 
              key={range.labelKey} 
              className="flex items-center gap-3 cursor-pointer hover:text-blue-600 transition-colors"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                checked={currentMin === range.min && currentMax === range.max}
                onChange={() => handlePriceChange(range.min, range.max)}
              />
              <span>{t(`ranges.${range.labelKey}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Nút reset nhanh (Tùy chọn) */}
      {(currentMin || currentMax) && (
        <button 
          onClick={() => router.push(pathname)}
          className="text-xs text-red-500 underline"
        >
          {t("clearFilters")}
        </button>
      )}
    </div>
  );
}