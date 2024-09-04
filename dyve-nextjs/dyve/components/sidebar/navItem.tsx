"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export function NavItem({
  href,
  children,
  onClickHandler,
}: {
  href: string;
  children: React.ReactNode;
  onClickHandler?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={onClickHandler}
      className={clsx(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-300 dark:text-gray-50 dark:hover:text-gray-50",
        {
          "bg-gray-100 dark:bg-gray-800": pathname === href,
        },
      )}
    >
      {children}
    </Link>
  );
}
