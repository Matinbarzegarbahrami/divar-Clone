import { PHONES, type PhoneUser } from "@/MOCKS/REGISTER";
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

  const existingUser: PhoneUser | undefined = PHONES.find(
    (user) => user.phone === phone
  );

  if (existingUser) {
    existingUser.logincode = verifyCode;

    return NextResponse.json({
      message: "Verify code updated for existing user",
      verifyCode,
    });
  }
  (verifyCode)
  
  const newUser: PhoneUser = {
    phone,
    logincode: verifyCode,
  };

  PHONES.push(newUser);

  return NextResponse.json({
    message: "User created and verify code set",
    verifyCode,
  });
}