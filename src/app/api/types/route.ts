import { getAllTypes, queryPartners } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const types = await getAllTypes();
    return NextResponse.json(types);
  } catch (error) {
    console.error(error);
    return new Response("Could not fetch types", { status: 500 });
  }
}
