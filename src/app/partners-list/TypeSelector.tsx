import { Type } from "@/types";
import styles from "./styles.module.scss";
import TypeSelectorSelect from "./TypeSelectorSelect";
import { getAllTypes } from "@/db";

interface TypeSelectorProps {
  onQuery?: (type: Type | null) => void;
  nullOptionText?: string;
}
const TypeSelector: React.FC<TypeSelectorProps> = async ({ onQuery, nullOptionText }) => {
  let allTypes: Type[] = [];
  try {
    allTypes = await getAllTypes();
  } catch (error) {
    console.error("Error fetching types:", error);
  }

  return (
    <div className={styles["type-selector-container"]}>
      <TypeSelectorSelect>
        <option value="">{nullOptionText ?? "None"}</option>
        {allTypes.map((type) => (
          <option key={type.type_id} value={type.type_id}>
            {type.name}
          </option>
        ))}
      </TypeSelectorSelect>
    </div>
  );
};
export default TypeSelector;
