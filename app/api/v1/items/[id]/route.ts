export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const backendUrl = process.env.BACKEND_API_URL;

  const res = await fetch(`${backendUrl}/api/item/${params.id}`, {
    method: "GET",
  });

  const data = await res.json();

  return Response.json(data, {
    status: res.status,
  });
}