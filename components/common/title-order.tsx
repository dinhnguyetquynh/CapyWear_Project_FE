export default function TitleItems(){
    return(
        <div className="grid grid-cols-[100px_1fr_100px_150px_150px] gap-4 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-800 truncate">
                        HÌNH ẢNH
                    </div>
                    {/* Cột 1: Tên sản phẩm */}
                    <div className="font-medium text-gray-800 truncate" title={''}>
                        TÊN
                    </div>
        
                    {/* Cột 2: Số lượng */}
                    <div className="text-center text-gray-600">
                        SỐ LƯỢNG
                    </div>
        
                    {/* Cột 3: Đơn giá */}
                    <div className="text-right text-gray-600">
                        ĐƠN GIÁ
                    </div>
        
                    {/* Cột 4: Thành tiền */}
                    <div className="text-right font-semibold text-blue-600">
                        THÀNH TIỀN
                    </div>
    </div>
    )
}