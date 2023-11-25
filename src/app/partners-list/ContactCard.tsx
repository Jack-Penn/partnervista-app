"use client";

import { Partner } from "@/types";

interface ContactCardProps {
  partner: Partner;
}
export const ContactCard: React.FC<ContactCardProps> = ({ partner }) => {
  const vCardContent = `
    BEGIN:VCARD
    VERSION:3.0
    FN:${partner.name}
    ORG:${partner.name}
    EMAIL:${partner.contact_email}
    TEL:${partner.contact_phone}
    END:VCARD
  `;
  const blob = new Blob([vCardContent], { type: "text/vcard" });
  const url = window.URL.createObjectURL(blob);
  window.URL.revokeObjectURL(url);

  return (
    <p style={{ cursor: "pointer" }}>
      <a href={url} download={`${partner.name}_contact.vcf`}>
        Download Contact Card
      </a>
    </p>
  );
};
