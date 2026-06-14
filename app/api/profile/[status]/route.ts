import { NextRequest, NextResponse } from "next/server";
import { ALLPOSTS } from "@/MOCKS/POSTS";
import jwt from "jsonwebtoken"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ status: string }> }
) {
  const { status } = await params;

    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const phone = payload?.phone;

    if(status=='all'){
        const userpost = ALLPOSTS.filter(
        (post) => post.owner.phone === phone
    )
        return NextResponse.json({ posts: userpost });
    }
    const userpost = ALLPOSTS.filter(
        (post) => post.owner.phone === phone
    )
    .filter((post)=>(
        post.status == status
    ));

    return NextResponse.json({ posts: userpost });
}