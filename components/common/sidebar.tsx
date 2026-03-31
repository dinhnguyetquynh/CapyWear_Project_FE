const CATEGORIES = ["Áo thun", "Sơ mi", "Quần Jean", "Áo khoác", "Phụ kiện"];

export default function Sidebar() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">Danh mục</h3>
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <a href="#" className="text-gray-600 hover:text-black hover:pl-2 transition-all duration-200 block py-1 border-b border-transparent hover:border-gray-100">
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wider">Khoảng giá</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" /> Dưới 500k</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" /> 500k - 1tr</label>
        </div>
      </div>
    </div>
  );
}