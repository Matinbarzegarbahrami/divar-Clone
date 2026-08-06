import prisma from "@/app/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest,{params}:{params:Promise<{id:string}>}){
  const {id} = await params;
  if (!id){
    return 
  }
  const user = await prisma.user.findFirst({
    where:{
      id:+id
    }
  })
  if (!user){
    return NextResponse.json({
      message:"user not found"
    }, { status: 404})
  }
  return NextResponse.json({
      user:user
    }, { status: 200})
  
}