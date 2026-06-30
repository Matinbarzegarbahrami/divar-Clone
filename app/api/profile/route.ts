import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type DataT = {
    id:string;
    phone:string;
    iat:number;
    exp:number;
}

export async function GET(
  request: NextRequest,
) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log(token)
    const data = jwt.verify( token,process.env.JWT_SECRET! ) as DataT;
    const user = {
        phone:data.phone,
        id:data.id
    }
    return NextResponse.json({ user: user });
}