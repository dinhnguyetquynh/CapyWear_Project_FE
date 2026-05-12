
import { getAccessToken } from '@/service/auth-server.service';
import { NextRequest, NextResponse } from 'next/server';
 
const backendUrl = process.env.BACKEND_API_URL;

//API ADD ITEM TO CART
export async function POST(request: NextRequest) {
   const token = await getAccessToken(request);
   console.log(">>> [API CART] Current Token:", token);

   if (!token) {
     console.warn(">>> [API CART] Warning: Token is undefined or null!");
   }
  try {
    const body = await request.json();
    const response = await fetch(`${backendUrl}/api/cart/add-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error("Route Handler ADD CART Error:", error);
    return NextResponse.json(
      { code: 500, message: "Không thể kết nối đến máy chủ", result: null },
      { status: 500 }
    );
  }
}

export async function GET(request:NextRequest){
  const token = await getAccessToken(request);
  try{
      const response = await fetch(`${backendUrl}/api/cart/detail`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  }catch(error){
    console.error("Route Handler get cart list Error:", error);
    return NextResponse.json(
      { code: 500, message: "Không thể kết nối đến máy chủ", result: null },
      { status: 500 }
    );
  }

}