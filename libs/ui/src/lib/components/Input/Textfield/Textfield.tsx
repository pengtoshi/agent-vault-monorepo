import clsx from "clsx";
import React, { forwardRef, useEffect, useId, useState } from "react";
import type { UIProps } from "../../../props";

export interface TextfieldProps extends UIProps.Input {
  id?: string;
  type?: "number" | "text";
  label?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  guide?: string;
  error?: string;
  onClear?: () => void;
}

const getDefaultValue = (type?: "number" | "text", value?: string | number, defaultValue?: string | number) => {
  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue;
  if (type === "number") return 0;
  return "";
};

const fieldCommon =
  "flex h-10 px-4 gap-2.5 items-center justify-between self-stretch rounded-md border border-gray-300 autofill-hide transition-all duration-300";
const inputCommon = "text-14/body peer w-full self-stretch overflow-ellipsis bg-transparent focus:outline-none";
const fieldColor = "bg-gray-100 hover:bg-gray-50 focus-within:border-primary-500 focus-within:bg-gray-50";
const textColor = "text-gray-950 placeholder:text-gray-400 disabled:text-gray-350";

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(function Textfield(
  {
    id,
    type = "text",
    label,
    leadingIcon,
    trailingIcon,
    placeholder,
    value,
    defaultValue,
    guide,
    error,
    required,
    disabled = false,
    onChange,
    className,
    ...props
  },
  ref,
) {
  const localId = `ui-${useId()}`;
  const inputId = id || localId;

  const [internalValue, setInternalValue] = useState(getDefaultValue(type, value, defaultValue));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  useEffect(() => {
    if (value === undefined) return;
    setInternalValue(value);
  }, [value]);

  return (
    <div className={clsx("flex w-full flex-col items-start gap-1.5", className)}>
      <div className={clsx(fieldCommon, fieldColor, disabled && "!bg-gray-200")}>
        {!!leadingIcon && leadingIcon}
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          type={type}
          value={internalValue}
          onChange={handleChange}
          className={clsx(inputCommon, textColor)}
          {...props}
        />
        {!!trailingIcon && trailingIcon}
      </div>
      <div className="flex w-full flex-col items-start gap-0.5">
        {!!guide && <div className="text-12/body text-gray-600">{guide}</div>}
        {!!error && <div className="text-12/body text-etc-negative">{error}</div>}
      </div>
    </div>
  );
});
