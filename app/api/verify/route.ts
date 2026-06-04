
import { db } from "@/src/db/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { phone, code } = body;

    if (!phone || !code) {
        return NextResponse.json(
            { message: "Phone and code are required" },
            { status: 400 }
        );
    }

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.phone, phone))
        .limit(1);

    if (existingUser.length === 0) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    const user = existingUser[0];
    
    if (user.logincode !== code) {
        return NextResponse.json(
            { message: "Invalid verification code" },
            { status: 401 }
        );
    }

    await db
        .update(users)
        .set({ logincode: null })
        .where(eq(users.phone, phone));

    // ===== JWt =====

    return NextResponse.json({
        message: "Verification successful",
        user: { id: user.id, phone: user.phone }
    });
}