"use client";

import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

interface SearchBarProps {
  setSearchParams: Dispatch<SetStateAction<{}>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchParams }) => {
  //   const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const initialLoad = useRef<boolean>(true);

  useEffect(() => {
    if (!initialLoad.current) {
      handleSearch();
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      setSearchParams((prevParams) => ({ ...prevParams, search: searchQuery }));
    } else {
      setSearchParams((prevParams) => {
        const copy: any = { ...prevParams };
        if (copy.hasOwnProperty("search")) delete copy.search;
        return copy;
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    initialLoad.current = false;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles["search-container"]}>
      <input
        className={styles["search-bar"]}
        type="text"
        placeholder="Search partners..."
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <i className={`${styles["search-icon"]} text-lg`}>🔍</i>
    </div>
  );
};

export default SearchBar;
