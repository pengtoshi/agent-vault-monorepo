import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconButton } from "@libs/ui";
import type { IconProps } from "@libs/ui";

const BottomNavigationMenu: {
  key: string;
  title: string;
  href: string;
  targetUrls: string[];
  icon: IconProps["name"];
  selectedIcon?: IconProps["name"];
}[] = [
  {
    key: "home",
    title: "Home",
    href: "/",
    targetUrls: ["/"],
    icon: "Home",
    selectedIcon: "HomeFilled",
  },
  {
    key: "agents",
    title: "Agents",
    href: "/agents",
    targetUrls: ["/agents"],
    icon: "Agent",
  },
  {
    key: "mypage",
    title: "My Page",
    href: "/mypage",
    targetUrls: ["/mypage"],
    icon: "Person",
    selectedIcon: "PersonFilled",
  },
];

export const BottomNavigation = () => {
  const router = useRouter();
  const { pathname } = router;
  const [selected, setSelected] = useState(() => {
    const currentTab = BottomNavigationMenu.find((menu) => menu.targetUrls.includes(pathname));
    return currentTab?.key ?? "home";
  });

  useEffect(() => {
    const currentTab = BottomNavigationMenu.find((menu) => menu.targetUrls.includes(pathname));
    if (currentTab) {
      setSelected(currentTab.key);
    }
  }, [pathname]);

  return (
    <div className="sticky bottom-0 z-10 flex w-full flex-col items-center justify-center">
      <div className="pb-safe-bottom flex w-full flex-row items-center justify-center border-t border-gray-200 bg-white px-3">
        {BottomNavigationMenu.map(({ key, title, href, icon, selectedIcon }) => (
          <Link key={key} href={href} className="relative flex-1">
            <div className="flex h-14 w-full items-center justify-center p-1">
              <div className="flex flex-col items-center justify-center gap-0.5">
                <IconButton
                  name={selectedIcon && key === selected ? selectedIcon : icon}
                  size={24}
                  iconClassName={clsx(key === selected && "text-primary-500")}
                />
                <span className={clsx("text-12/body", key === selected ? "text-primary-500" : "text-gray-600")}>
                  {title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
