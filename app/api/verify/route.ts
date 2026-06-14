import { PHONES, type PhoneUser } from "@/MOCKS/REGISTER";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
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

  const token = jwt.sign({
    id: crypto.randomUUID(),
    phone: phone,
  },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d"
    }
  )

  const response = NextResponse.json({
    message: "Verification successful",
    user: {
      phone: user.phone,
    },
  });
  
  
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  
  return response;
}