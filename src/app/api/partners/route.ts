import { queryPartners } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit") || 10;
  const offset = req.nextUrl.searchParams.get("offset") || 0;
  const searchQuery = req.nextUrl.searchParams.get("search") || undefined;
  console.log(searchQuery);
  // const types = req.nextUrl.searchParams.get("types")?.split(",") || [];
  const typeId = req.nextUrl.searchParams.get("type") || undefined;
  try {
    const partners = await queryPartners({ searchQuery, typeId, limit: +limit, offset: +offset });
    return NextResponse.json(partners);
  } catch (error) {
    console.error(error);
    return new Response("Could not fetch partners", { status: 500 });
  }
}
