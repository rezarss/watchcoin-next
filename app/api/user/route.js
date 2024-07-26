"use client";
import mongoose from "mongoose";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request) {
  let test = request.nextUrl.searchParams.get("test");
  return NextResponse.json({ test }, { status: 200 });
}
