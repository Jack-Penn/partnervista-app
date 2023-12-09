import { Partner, Type } from "@/types";
import styles from "./styles.module.scss";
import { ContactCard } from "./ContactCard";
import SearchBar from "./SearchBar";
import TypeChip from "./TypeChip";
import TypeSelector from "./TypeSelector";
import Image from "next/image";
import { queryPartners } from "@/db";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = (searchParams.search || "") as string;
  const typeQuery = (searchParams.type || "") as string;

  const partners = await queryPartners({
    searchQuery,
    typeId: typeQuery,
    limit: 100,
    offset: 0,
  });

  return (
    <>
      <div className={`flex gap-10 m-2.5`}>
        <SearchBar />
        <div className="flex gap-4 items-center">
          <span>Type Filter:</span>
          <TypeSelector />
        </div>
      </div>
      <div>
        {partners.map((partner: Partner) => (
          <PartnerCard partner={partner} key={partner.partner_id} />
        ))}
      </div>
    </>
  );
}

interface PartnerCardProps {
  partner: Partner;
}
const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  function formatDate(date: Date) {
    // Get the date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString(); // Months are zero-based
    const day = date.getDate().toString();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();

    // Format the date as "mm-dd-yyyy hh:ss"
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  return (
    <div className={styles["partner-card"]}>
      <div className="flex items-center	mb-2 gap-3">
        <h2 className="text-2xl font-bold">{partner.name}</h2>
        {
          <a href={partner.website} target="_blank" rel="noopener noreferrer">
            <Image className="cursor-alias" src="/website-icon.svg" alt="Website Icon" width={25} height={25} />
          </a>
        }
      </div>
      <div className={`${styles["types-container"]} gap-2`}>
        {partner.types.map((type: Type) => (
          <TypeChip key={type.type_id} type={type} />
        ))}
      </div>
      <p>
        <strong>Resources:</strong> {partner.resources}
      </p>
      <p>
        <strong>Description:</strong> {partner.description}
      </p>
      <p>
        <strong>Contact Name:</strong> {partner.contact_name}
      </p>
      <p>
        <strong>Contact Email:</strong>{" "}
        <a className="link" href={"mailto:" + partner.contact_email}>
          {partner.contact_email}
        </a>
      </p>
      <p>
        <strong>Contact Phone:</strong>{" "}
        <a className="link" href={"tel:" + partner.contact_phone}>
          {partner.contact_phone}
        </a>
      </p>
      <p>
        <strong>Created At:</strong> {partner.created_at ? formatDate(partner.created_at) : "N/A"}
      </p>
      <p>
        <strong>Updated At:</strong> {partner.updated_at ? formatDate(partner.updated_at) : "N/A"}
      </p>
      <ContactCard partner={JSON.parse(JSON.stringify(partner))} />
    </div>
  );
};
