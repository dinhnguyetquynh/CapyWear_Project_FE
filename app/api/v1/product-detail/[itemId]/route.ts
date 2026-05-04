import { ApiRes } from "@/types/general";
import { ItemRes } from "@/types/item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ itemId: string }> } 
) {
    const { itemId } = await params;

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/item/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Không tìm thấy sản phẩm' },
                { status: res.status }
            );
        }

        const data: ApiRes<ItemRes> = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            { error: 'Lỗi kết nối server' },
            { status: 500 }
        );
    }
}