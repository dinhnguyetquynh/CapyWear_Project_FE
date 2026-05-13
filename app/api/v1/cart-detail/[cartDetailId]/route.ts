import { getAccessToken } from "@/service/auth-server.service";
import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.BACKEND_API_URL;

type Params = {
  params: {
    cartDetailId: string;
  };
};

export async function DELETE(
  request:NextRequest,
   { params }: Params
){
  const token = await getAccessToken(request);
  
  try{
    const response = await fetch(`${backendUrl}/api/cart/${params.cartDetailId}`,
      {
        method:"DELETE",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    )
     const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  }catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}