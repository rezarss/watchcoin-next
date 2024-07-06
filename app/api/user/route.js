import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/Users";

export const runtime = "edge";

export async function GET(request) {
  const telegramId = request.nextUrl.searchParams.get("tgid");
  await dbConnect();
  try {
    const user = await User.findOne({ telegramId });
    if (!user) {
      return NextResponse.json(
        { result: false, error: "User not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ result: true, data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { result: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function POST(request) {
  const test = await request.json();
  return NextResponse.json({ test: test }, { status: 200 });
}
