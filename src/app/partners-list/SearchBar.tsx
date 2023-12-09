"use client";

import styles from "./styles.module.scss";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const SearchBar: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (search: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (search) {
      newParams.set("search", search);
    } else {
      newParams.delete("search");
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className={styles["search-container"]}>
      <input
        className={styles["search-bar"]}
        type="text"
        name="search"
        placeholder="Search partners..."
        autoComplete="off"
        defaultValue={searchParams?.get("search") || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <i className={`${styles["search-icon"]} text-lg`}>🔍</i>
    </div>
  );
};

export default SearchBar;
