import { Partner } from "@/types";

interface ContactCardProps {
  partner: Partner;
}
export const ContactCard: React.FC<ContactCardProps> = ({ partner }) => {
  return (
    <a
      className="link"
      target="_blank"
      href={`/api/partners/contact-card/${partner.partner_id}`}
      download={`${partner.name}_contact.vcf`}
    >
      Download Contact Card
    </a>
  );
};
