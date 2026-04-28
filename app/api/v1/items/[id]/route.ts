import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const backendUrl = process.env.BACKEND_API_URL;

  const res = await fetch(`${backendUrl}/api/item/${id}`);

  const data = await res.json();

  return Response.json(data, {
    status: res.status,
  });
}