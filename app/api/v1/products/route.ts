import { ItemRes, PageResponse } from "@/types/item";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);


  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const page = searchParams


  const query = new URLSearchParams();

  if (minPrice !== null && minPrice !== "") {
    query.append('minPrice', minPrice);
  }

  if (maxPrice !== null && maxPrice !== "") {
    query.append('maxPrice', maxPrice);
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/item/range-price?${query.toString()}`
    );

    const data: PageResponse<ItemRes> = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
