import clsx from "clsx";
import { forwardRef, useEffect, useId, useState } from "react";
import type { UIProps } from "../../../props";

export interface TextareaProps extends UIProps.TextArea {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  guide?: string;
  error?: string;
}

const fieldCommon =
  "flex h-[100px] px-4 py-2.5 gap-2.5 items-center justify-between self-stretch rounded-md border border-gray-300 autofill-hide transition-all duration-300";
const inputCommon =
  "text-14/body peer w-full self-stretch overflow-ellipsis bg-transparent focus:outline-none resize-none";
const fieldColor = "bg-gray-100 hover:bg-gray-50 focus-within:border-primary-500 focus-within:bg-gray-50";
const textColor = "text-gray-950 placeholder:text-gray-400 disabled:text-gray-350";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    id,
    label,
    placeholder,
    value,
    defaultValue,
    guide,
    error,
    required,
    disabled,
    maxLength,
    onChange,
    className,
    ...props
  },
  ref,
) {
  const localId = `ui-${useId()}`;
  const inputId = id || localId;

  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");
  const [currentLength, setCurrentLength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
    setCurrentLength(e.target.value.length);
    onChange?.(e);
  };

  useEffect(() => {
    if (value === undefined) return;
    setInternalValue(value);
  }, [value]);

  return (
    <div className={clsx("flex w-full flex-col items-start gap-1.5", className)}>
      <div className={clsx(fieldCommon, fieldColor, disabled && "!bg-gray-200")}>
        <textarea
          id={inputId}
          ref={ref}
          value={internalValue}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          onChange={handleChange}
          className={clsx(inputCommon, textColor)}
          {...props}
        />
      </div>
      <div className="flex w-full justify-between gap-4">
        <div className="flex w-full flex-col items-start gap-0.5">
          {!!guide && <div className="text-12/body text-gray-600">{guide}</div>}
          {!!error && <div className="text-12/body text-etc-negative">{error}</div>}
        </div>
        {!!maxLength && (
          <div className="text-12/body text-gray-600">
            {currentLength}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
});
