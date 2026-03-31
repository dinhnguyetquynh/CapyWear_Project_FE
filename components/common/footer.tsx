// components/common/footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">CLOTHING STORY</h2>
          <p className="text-gray-500 text-sm max-w-xs">
            Thương hiệu thời trang hàng đầu dành cho những người yêu thích sự tối giản và chất lượng.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Hỗ trợ</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Chính sách đổi trả</li>
            <li>Hướng dẫn chọn size</li>
            <li>Kiểm tra đơn hàng</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Kết nối</h4>
          <div className="flex gap-4 text-xl">
            {/* Thêm các icon Facebook, Instagram ở đây */}
            <span>FB</span> <span>IG</span> <span>TT</span>
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-sm text-gray-400">
        © 2026 Clothing Story. All rights reserved.
      </div>
    </footer>
  );
}