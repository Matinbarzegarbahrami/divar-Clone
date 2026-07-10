import prisma from "@/app/src/lib/prisma";
import { ALLPOSTS } from "@/MOCKS/POSTS";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Category } from "@prisma/client";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { searchParams } = request.nextUrl;
  const { slug } = await params;

  const page = Number(searchParams.get("page") ?? 1);
  const city = searchParams.get("city");
  const price = searchParams.get("price");

  const isValidCategory =
    slug && Object.values(Category).includes(slug as any);


  let priceFilter = {};

  if (price) {

    const [min, max] = price.split("-").map(Number);

    priceFilter = {
      gte: min,
      lte: max,
    };
  }
  try {
    const posts = await prisma.post.findMany({
      where: {
        ...(city ? {
          city: {
            name: city
          }
        } : {}),

        ...(isValidCategory
          ? { category: slug as Category }
          : {}),

        ...(Object.keys(priceFilter).length
          ? { price: priceFilter }
          : {}),
      },

      skip: (page - 1) * 10,
      take: 10,

    })
    return NextResponse.json({
      status: 200,
      posts: posts
    })
  } catch (error) {
    console.error("خطا در دریافت آگهی‌ها:", error);

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
