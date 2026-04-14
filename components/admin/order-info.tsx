import TitleItems from "../common/title-order";

export default function OrderInfor(){
    return(
        <div className="flex flex-row justify-between items-start p-4 border rounded-lg">
            <div className="div1">
                <h2 className="font-bold text-lg mb-2">THÔNG TIN ĐƠN HÀNG</h2>
                <p><span className="font-semibold">Mã đơn hàng:</span>123456</p>
                <p><span className="font-semibold">Email khách hàng:</span>dquynhd202@gmail.com</p>
                <p><span className="font-semibold">Ngày đặt:</span>14/02/2026</p>
                <p>
                    <span className="font-semibold">Tổng tiền:</span>
                    <span className="font-semibold text-red-700">200.000VND</span>
                </p>
            </div>

            <div className="div2">
                <p>
                    <span className="font-semibold text-blue-600">Trạng thái:</span>
                    <span className="font-semibold text-red-700"> ĐANG XỬ LÝ</span>
                </p>
            </div>
            <TitleItems/>
            
        </div>
    )
}