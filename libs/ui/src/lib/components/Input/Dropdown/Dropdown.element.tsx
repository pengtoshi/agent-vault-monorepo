import clsx from "clsx";
import { Interaction } from "../../Display/Interaction/Interaction";

export interface DropdownListTextProps<T> {
  option: T;
  selected: T | null;
  onSelect: (option: T) => void;
  renderOption?: (option: T) => React.ReactNode;
}

export const DropdownListText = <T extends string | number>({
  option,
  selected,
  onSelect,
  renderOption,
}: DropdownListTextProps<T>) => (
  <li
    role="option"
    aria-selected={selected === option}
    tabIndex={0}
    className={clsx("group relative cursor-pointer rounded-sm px-3 py-2", selected === option && "text-primary-500")}
    onClick={() => onSelect(option)}
    onKeyDown={(e) => e.key === "Enter" && onSelect(option)}
  >
    <Interaction className="bg-primary-500" />
    {renderOption ? renderOption(option) : option}
  </li>
);
