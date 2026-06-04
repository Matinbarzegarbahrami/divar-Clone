import { db } from "@/src/db/db";
import { users } from "@/src/db/schema";
import { randomInt } from "crypto";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const phone = body.number;

    if (!phone) {
        return NextResponse.json(
            { message: "Phone number is required" },
            { status: 400 }
        );
    }

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.phone, phone))
        .limit(1);

    const verifyCode = randomInt(100000, 999999);

    if (existingUser.length > 0) {
        await db
            .update(users)
            .set({
                logincode: String(verifyCode),
            })
            .where(eq(users.phone, phone));
            // ==== OTP ======
            console.log(verifyCode)
        return NextResponse.json({
            message: "Verify code updated for existing user",
            verifyCode,
        });
    }

    await db.insert(users).values({
        phone,
        logincode: String(verifyCode),
    });
    // ==== OTP ======
    console.log(verifyCode)
    return NextResponse.json({
        message: "User created and verify code set",
        verifyCode,
    });
}