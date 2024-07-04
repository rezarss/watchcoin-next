import { NextResponse } from "next/server";
import dbConnect from "../lib/dbConnect";
import User from "../models/Users";

export async function GET(request) {
  //const { telegramId } = await req.json();

  const test = request.nextUrl.searchParams.get("test");

  return NextResponse.json({ test }, { status: 200 });

  //   await dbConnect();
  //   try {
  //     const user = await User.findOne({ telegramId });
  //     if (!user) {
  //       return NextResponse.json(
  //         { result: false, error: "User not found" },
  //         { status: 404 },
  //       );
  //     }
  //     return NextResponse.json({ result: true, data: user }, { status: 200 });
  //   } catch (error) {
  //     return NextResponse.json(
  //       { result: false, error: error.message },
  //       { status: 400 },
  //     );
  //   }
}
