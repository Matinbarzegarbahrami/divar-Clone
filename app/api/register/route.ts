import { PHONES, type PhoneUser } from "@/MOCKS/REGISTER";
import prisma from "@/app/src/lib/prisma";
import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";
interface SendOtpRequest {
  number: string;
}
export async function POST(request: NextRequest) {
  const body: SendOtpRequest = await request.json();

  const phone = body.number;

  if (!phone) {
    return NextResponse.json(
      { message: "Phone number is required" },
      { status: 400 }
    );
  }

  const verifyCode = randomInt(100000, 999999).toString();

  const existingUser: PhoneUser | null = await prisma.user.findFirst({
    where: { phone },
  });

  if (existingUser) {
    existingUser.verifyCode = verifyCode;
    await prisma.user.update({
      where: { phone },
      data: { verifyCode },
    });

    return NextResponse.json({
      message: "Verify code updated for existing user",
      verifyCode,
    });
  }

  await prisma.user.create({
    data: {
      phone,
      verifyCode
    },
  });

  return NextResponse.json({
    message: "User created and verify code set",
    verifyCode,
  });
}