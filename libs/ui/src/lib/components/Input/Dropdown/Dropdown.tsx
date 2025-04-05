import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { DropdownListText } from "./Dropdown.element";
import type { UIProps } from "../../../props";
import { Interaction } from "../../Display/Interaction/Interaction";
import { Icon } from "../../Icon/Icon";

export interface DropdownProps<T> extends Omit<UIProps.Div, "onSelect"> {
  options: T[];
  onSelect: (option: T) => void;
  renderOption?: (option: T) => React.ReactNode;
  disabled?: boolean;
  guide?: string;
  error?: string;
}

export const Dropdown = <T extends string | number>({
  options,
  onSelect,
  renderOption,
  guide,
  error,
  disabled = false,
  className,
  ...props
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: T) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={clsx("flex w-60 flex-col items-start gap-1.5 text-14/body", className)}
      {...props}
    >
      <div className="relative inline-block w-full">
        <button
          type="button"
          className={clsx(
            "group relative flex h-10 w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-4 focus:border-primary-500",
            selected ? "text-gray-950" : "text-gray-400",
            disabled && "cursor-not-allowed bg-gray-200 text-gray-350",
          )}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
        >
          {!disabled && <Interaction />}
          {selected ? selected.toString() : "Select an option"}
          <Icon
            name="ChevronDown"
            size={20}
            className={clsx("transition-transform duration-300", isOpen && "rotate-180")}
          />
        </button>
        {isOpen && (
          <ul className="absolute left-0 mt-2 w-full rounded-md border border-gray-300 bg-white p-1 shadow-emphasize">
            {options.map((option, index) => (
              <DropdownListText<T>
                key={index}
                option={option}
                onSelect={handleSelect}
                selected={selected}
                renderOption={renderOption}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="flex w-full flex-col items-start gap-0.5">
        {!!guide && <div className="text-12/body text-gray-600">{guide}</div>}
        {!!error && <div className="text-12/body text-etc-negative">{error}</div>}
      </div>
    </div>
  );
};
