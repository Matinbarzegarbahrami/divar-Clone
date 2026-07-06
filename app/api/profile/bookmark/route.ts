import prisma from "@/app/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DataT } from "../route";
export async function Post(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();

    await prisma.like.create({
        data:{
            userId:Number(data.userId),
            postId:Number(data.postId)
        }
    });

    return NextResponse.json({ message: "Bookmark added successfully" });
}

export async function GET(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET!) as DataT;
    console.log(user)
    const data = await prisma.like.findMany({
        where: {
            userId: Number(user.id),
        },
    });
    console.log("bookmarks:", data)
    return NextResponse.json({ bookmarks: data },{status:200});
}