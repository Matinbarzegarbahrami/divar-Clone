import { db } from "@/src/db/db";
import { cities } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function GET() {

    const city = await db.select().from(cities);

  return NextResponse.json(city);
}