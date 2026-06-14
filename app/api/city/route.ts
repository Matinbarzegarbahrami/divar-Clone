import {CITIES} from "@/MOCKS/CITIES";
import { NextResponse } from "next/server";

export async function GET() {

    const city = await CITIES;
     (city)

  return NextResponse.json(city);
}