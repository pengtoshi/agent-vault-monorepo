import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export interface TabItem<T extends string> {
  id: T;
  label: string;
}

export interface TabNavigationProps<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
}

export const TabNavigation = <T extends string>({ tabs, activeTab, onTabChange, className }: TabNavigationProps<T>) => {
  const [sliderStyle, setSliderStyle] = useState<React.CSSProperties>({});
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const setTabRef = (el: HTMLButtonElement | null, index: number) => {
    tabsRef.current[index] = el;
  };

  useEffect(() => {
    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeTabElement = tabsRef.current[activeTabIndex];

    if (activeTabElement) {
      setSliderStyle({
        width: `${activeTabElement.offsetWidth}px`,
        transform: `translateX(${activeTabElement.offsetLeft}px)`,
        transition: "transform 0.3s ease, width 0.3s ease",
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className={clsx("relative flex w-full border-b border-gray-200", className)}>
      <div className="flex w-full">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            ref={(el) => setTabRef(el, index)}
            className={clsx(
              "flex-1 py-3 text-14/body font-medium transition-colors duration-200",
              activeTab === tab.id ? "text-primary-500" : "text-gray-600 hover:text-gray-900",
            )}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 h-0.5 bg-primary-500 transition-all duration-300" style={sliderStyle} />
    </div>
  );
};
