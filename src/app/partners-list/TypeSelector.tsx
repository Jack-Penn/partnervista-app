import { Type } from "@/types";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface TypeSelectorProps {
  setSearchParams: Dispatch<SetStateAction<{}>>;
}
const TypeSelector: React.FC<TypeSelectorProps> = ({ setSearchParams }) => {
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("/api/types"); // Replace 'your-endpoint' with the actual endpoint
        const typesData: Type[] = await response.json();
        setTypes(typesData);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  useEffect(() => {
    if (selectedType == null) {
      setSearchParams((prevParams) => {
        const copy: any = { ...prevParams };
        if (copy.hasOwnProperty("type")) delete copy.type;
        return copy;
      });
    } else {
      setSearchParams((prevParams) => ({ ...prevParams, type: selectedType }));
    }
  }, [selectedType]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = parseInt(event.target.value, 10) || null;
    setSelectedType(typeId);
  };

  return (
    <div className={styles["type-selector-container"]}>
      <span>Type Filter:</span>
      <select onChange={handleTypeChange} className={styles["type-select"]} value={selectedType || ""}>
        <option value="">None</option>
        {types.map((type) => (
          <option key={type.type_id} value={type.type_id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default TypeSelector;
