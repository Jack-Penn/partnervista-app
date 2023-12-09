import { getParnterById, queryPartners } from "@/db";
import { Partner } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const partnerId = params.id;
  const partner = await getParnterById(partnerId);

  const vCardContent = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${partner.name}`,
    `ORG:${partner.name}`,
    `EMAIL:${partner.contact_email}`,
    `TEL:${partner.contact_phone}`,
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vCardContent], { type: "text/vcard" });

  return new NextResponse(blob, { headers: { "content-type": "text/vcard" } });
}
