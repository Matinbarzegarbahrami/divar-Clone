import prisma from "@/app/src/lib/prisma";
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
      gte: min,
      lte: max,
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

      status: "ACTIVE",

      ...(Object.keys(priceFilter).length
        ? { price: priceFilter }
        : {}),
    },

    skip: (page - 1) * 10,
    take: 10,
  });

  return NextResponse.json({ posts });
}