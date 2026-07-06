import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/src/lib/prisma";
import jwt from "jsonwebtoken";
import { DataT } from "../../route";
export async function GET(request: NextRequest,{ params}: { params: Promise<{id: string}>}) {
    
    const {id} = await params;
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = jwt.verify(token,process.env.JWT_SECRET!) as DataT;
    const post = await prisma.post.findUnique({
        where: {
            id: Number(id),
            userId: Number(user.id),
        },
    });
    return NextResponse.json({ post });
}