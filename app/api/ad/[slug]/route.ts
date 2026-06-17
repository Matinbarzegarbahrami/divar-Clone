import { ALLPOSTS } from "@/MOCKS/POSTS";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const post = ALLPOSTS.find((post) => post.id == slug)

    if (post) {
      return NextResponse.json({
        post: post
      },
        {
          status: 200
        })
    }
  } catch (err) {
    console.error("خطا در دریافت آگهی‌ها:", err);
    return NextResponse.json(
      {
        status: 500,
        message: "خطایی در پردازش درخواست رخ داد.",
      },
      {
        status: 500,
      }
    );
  }
}