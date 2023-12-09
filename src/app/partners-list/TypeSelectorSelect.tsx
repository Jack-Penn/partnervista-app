"use client";

import { useDebouncedCallback } from "use-debounce";
import styles from "./styles.module.scss";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface TypeSelectorSelectProps {
  children: React.ReactNode;
}
const TypeSelectorSelect: React.FC<TypeSelectorSelectProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  //use debounce only updates search after user finished typing
  const handleTypeSelect = useDebouncedCallback((search: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (search) {
      newParams.set("type", search);
    } else {
      newParams.delete("type");
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }, 300);

  return (
    <select
      className={styles["type-select"]}
      onChange={(e) => handleTypeSelect(e.target.value)}
      defaultValue={searchParams?.get("type") || ""}
    >
      {children}
    </select>
  );
};

export default TypeSelectorSelect;
