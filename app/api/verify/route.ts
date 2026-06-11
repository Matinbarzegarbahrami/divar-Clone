import { PHONES, type PhoneUser } from "@/MOCKS/REGISTER";
import { NextRequest, NextResponse } from "next/server";

interface VerifyRequest {
  phone: string;
  code: string;
}

export async function POST(request: NextRequest) {
  const body: VerifyRequest = await request.json();
  const { phone, code } = body;

  if (!phone || !code) {
    return NextResponse.json(
      { message: "Phone and code are required" },
      { status: 400 }
    );
  }

  const user: PhoneUser | undefined = PHONES.find(
    (u) => u.phone === phone
  );

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  if (user.logincode !== code) {
    return NextResponse.json(
      { message: "Invalid verification code" },
      { status: 401 }
    );
  }

  user.logincode = "";

  return NextResponse.json({
    message: "Verification successful",
    user: {
      phone: user.phone,
    },
  });
}