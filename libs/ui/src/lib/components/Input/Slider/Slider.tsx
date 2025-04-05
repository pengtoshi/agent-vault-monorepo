import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  step?: number;
  className?: string;
}

export const Slider = ({ value, onChange, min = 0, max, step = 1, className }: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLButtonElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const newValue = Math.min(max, Math.max(min, min + (max - min) * position));
    const steppedValue = Math.round(newValue / step) * step;
    onChange(steppedValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <button
      ref={sliderRef}
      type="button"
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label="Amount slider"
      className={clsx("relative h-2 w-full cursor-pointer rounded-full bg-gray-200", className)}
      onMouseDown={handleMouseDown}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") onChange(Math.max(min, value - step));
        if (e.key === "ArrowRight") onChange(Math.min(max, value + step));
      }}
    >
      <div
        className="absolute -bottom-0 left-0 h-full rounded-full bg-primary-500"
        style={{ width: `${percentage}%` }}
      />
      <div
        className={clsx(
          "absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-500 bg-white shadow-sm transition-transform",
          isDragging && "scale-110 shadow-md",
        )}
        style={{ left: `${percentage}%` }}
      />
    </button>
  );
};
