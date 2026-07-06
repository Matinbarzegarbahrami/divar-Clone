import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/app/src/lib/prisma";
import { Status } from "@prisma/client";
export async function GET(req: NextRequest, { params }: { params: Promise<{ status: string }> }) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({}, { status: 401 });

  const { id } = jwt.verify(token, process.env.JWT_SECRET!) as any;

  
  const {status} = await params
  console.log(status.toUpperCase())
  const posts = await prisma.post.findMany({
    where: {
      userId: Number(id),
      ...(status && status !== "all"
        ? { status: status.toUpperCase() as Status }
        : {}),
    },
  });
  console.log(posts)

  return NextResponse.json({ posts });
}