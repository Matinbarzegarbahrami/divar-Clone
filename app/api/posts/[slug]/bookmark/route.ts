import { NextRequest, NextResponse } from "next/server";
import jwt  from "jsonwebtoken";
import prisma from "@/app/src/lib/prisma";
import { DataT } from "@/app/api/profile/route";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const token = request.cookies.get("token")?.value;
    if (!token){
        return NextResponse.json({
            message:"Unauthorized"
        }, {status:401})
    }
    const user = jwt.verify(token, process.env.JWT_SECRET!) as DataT
    const post = await prisma.like.findFirst({
        where:{
            userId:Number(user.id),
            postId:Number(slug)
        }
    })
    if (!post){
        return NextResponse.json({
            message:"notBook"
        }, {status:200})
    }
    return NextResponse.json({
        message:"ok"
    }, {status:200})
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const token = request.cookies.get("token")?.value;
    if (!token){
        return NextResponse.json({
            message:"Unauthorized"
        }, {status:401})
    }
    const user = jwt.verify(token, process.env.JWT_SECRET!) as DataT
    await prisma.like.create({
        data:{
            userId:Number(user.id),
            postId:Number(slug)
        }
    })
    return NextResponse.json({
        message:"success"
    },{status:200})
}