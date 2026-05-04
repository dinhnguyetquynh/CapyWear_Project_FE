import { ApiRes } from "@/types/general";
import { ItemRes } from "@/types/item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { itemId: string } }
) {
    // 1. Lấy itemId từ dynamic route params
    const itemId = params.itemId;

    try {
        // 2. Gọi API đến Backend Spring Boot
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/item/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 } // Cache trong 60 giây (tùy chọn)
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Không tìm thấy sản phẩm hoặc lỗi server' },
                { status: res.status }
            );
        }
        const data: ApiRes<ItemRes> = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Lỗi khi fetch chi tiết sản phẩm:", error);
        return NextResponse.json(
            { error: 'Lỗi kết nối đến server backend' },
            { status: 500 }
        );
    }
}