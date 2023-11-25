"use client";

import { useState, useEffect, useRef } from "react";
import { Partner, Type, parseDataAsPartner } from "@/types";
import styles from "./styles.module.css";
import { ContactCard } from "./ContactCard";
import SearchBar from "./SearchBar";

const Page: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const offset = useRef<number>(0);
  const loadingPartners = useRef<boolean>(false);

  const [searchParams, setSearchParams] = useState({});

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
      <h1>Partners List</h1> <SearchBar setSearchParams={setSearchParams} />
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

  function darkenColor(hex: string, amount: number) {
    // Ensure the percent is between 0 and 1
    const darkenPercent = Math.min(1, Math.max(0, amount));

    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Calculate the darkened color
    r = Math.round(r * (1 - darkenPercent));
    g = Math.round(g * (1 - darkenPercent));
    b = Math.round(b * (1 - darkenPercent));

    // Convert back to hex
    const darkenedHex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;

    return darkenedHex;
  }

  return (
    <div className={styles["partner-card"]}>
      <h2>{partner.name}</h2>
      <div className={styles["types-container"]}>
        {partner.types.map((type: Type) => (
          <div
            key={type.type_id}
            className={styles["type-chip"]}
            style={{ background: `linear-gradient(180deg, ${type.color} 0%, ${darkenColor(type.color, 0.2)} 100%)` }}
          >
            {type.name}
          </div>
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
