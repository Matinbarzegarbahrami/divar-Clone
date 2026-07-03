import prisma from "@/app/src/lib/prisma";
import { ALLPOSTS } from "@/MOCKS/POSTS";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const page = Number(searchParams.get("page") ?? 1);
  const city = searchParams.get("city");
  const price = searchParams.get("price");

  let priceFilter = {};

  if (price) {
    const [min, max] = price.split("-").map(Number);

    priceFilter = {
      ...(min ? { gte: min } : {}),
      ...(max ? { lte: max } : {}),
    };
  }

  const posts = await prisma.post.findMany({
    where: {
      ...(city
        ? {
            city: {
              name: city,
            },
          }
        : {}),

      ...(Object.keys(priceFilter).length
        ? { price: priceFilter }
        : {}),
    },
  });

  return NextResponse.json({ posts });
}
