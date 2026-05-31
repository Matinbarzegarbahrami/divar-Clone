import { db } from "@/src/db/db";
import { users } from "@/src/db/schema";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const body = await request.json()
    const allUsers = await db.select().from(users)
    console.log("object")
    console.log(allUsers)

}