import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  const backendUrl = process.env.BACKEND_API_URL;

  const { searchParams } = new URL(req.url);

  const res = await fetch(
    `${backendUrl}/api/item/range-price?${searchParams.toString()}`
  );

  const data = await res.json();

  return Response.json(data, { status: res.status });
}