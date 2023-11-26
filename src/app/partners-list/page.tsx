"use client";

import { useState, useEffect, useRef } from "react";
import { Partner, Type, parseDataAsPartner } from "@/types";
import styles from "./styles.module.css";
import { ContactCard } from "./ContactCard";
import SearchBar from "./SearchBar";
import TypeChip from "./TypeChip";
import TypeSelector from "./TypeSelector";

interface SearchParams {
  limit: number;
  offset: number;
  search: string;
  type: string;
}

const Page: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const offset = useRef<number>(0);
  const loadingPartners = useRef<boolean>(false);

  const [searchParams, setSearchParams] = useState<Partial<SearchParams>>({});

  const loadMorePartners = async () => {
    loadingPartners.current = true;
    const limit = 3;
    const url = objectToQueryUrl("/api/partners", Object.assign({ limit, offset: offset.current }, searchParams));
    const res = await fetch(url);
    const newPartners = (await res.json()).map(parseDataAsPartner);
    setPartners((prevPartners) => [...prevPartners, ...newPartners]);
    offset.current += limit;
    loadingPartners.current = false;
  };

  function objectToQueryUrl(baseUrl: string, obj: any) {
    const queryString = Object.keys(obj)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join("&");

    return baseUrl + (queryString.length > 0 ? `?${queryString}` : "");
  }

  useEffect(() => {
    setPartners([]);
    offset.current = 0;
    // Initial load
    if (!loadingPartners.current) {
      loadMorePartners();
    }
  }, [searchParams]);

  const handleScroll = () => {
    const isScrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 25;

    if (isScrolledToBottom && !loadingPartners.current) {
      loadMorePartners();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [partners]);

  return (
    <>
      <h1>Partners List</h1>
      <div className={styles["query-container"]}>
        <SearchBar setSearchParams={setSearchParams} />
        <TypeSelector setSearchParams={setSearchParams} />
      </div>
      <div onScroll={handleScroll}>
        {partners.map((partner: Partner) => (
          <PartnerCard partner={partner} key={partner.partner_id} />
        ))}
      </div>
    </>
  );
};
export default Page;

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
      <h2>{partner.name}</h2>
      <div className={styles["types-container"]}>
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
        <strong>Contact Email:</strong> <a href={"mailto:" + partner.contact_email}>{partner.contact_email}</a>
      </p>
      <p>
        <strong>Contact Phone:</strong> <a href={"tel:" + partner.contact_phone}>{partner.contact_phone}</a>
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
