import { Type } from "@/types";
import styles from "./styles.module.scss";

interface TypeChipProps {
  type: Type;
}
const TypeChip: React.FC<TypeChipProps> = ({ type }) => {
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
    <div
      className={`${styles["type-chip"]} select-none`}
      style={{ background: `linear-gradient(180deg, ${type.color} 0%, ${darkenColor(type.color, 0.2)} 100%)` }}
    >
      {type.name}
    </div>
  );
};
export default TypeChip;
