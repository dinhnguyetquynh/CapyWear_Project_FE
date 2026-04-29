import { NextRequest } from "next/server";

// export async function GET(
//   req: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   console.log("CALL API PROXY:");
//   const { id } = await context.params;

//   const backendUrl = process.env.BACKEND_API_URL;

//   const res = await fetch(`${backendUrl}/api/item/${id}`);

//   const data = await res.json();

//   return Response.json(data, {
//     status: res.status,
//   });
// }

export async function GET(req: NextRequest) {
  const backendUrl = process.env.BACKEND_API_URL;

  const { searchParams } = new URL(req.url);

  const res = await fetch(
    `${backendUrl}/api/item/range-price?${searchParams.toString()}`
  );

  const data = await res.json();

  return Response.json(data, { status: res.status });
}