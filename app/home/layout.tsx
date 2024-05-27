"use client";

import Logo from "@/components/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Path } from "@/types";
import { LayoutDashboard, Store, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  const links: Path[] = [
    { title: "Categories", Icon: LayoutDashboard, path: "/home/categories" },
    { title: "Sell with us", Icon: Store, path: "/home/my-shop" },
    { title: "Track order", Icon: Truck, path: "/home/track-order" },
  ];

  return (
    <div className="flex w-screen h-screen p-4 gap-3">
      <aside className="w-64 h-full">
        <div className="flex flex-col py-2 justify-between h-full">
          <div>
            <Logo />
            <ul className="space-y-2 mt-4 font-medium">
              {links.map(({ title, path, Icon }, index) => (
                <li key={index}>
                  <Link
                    href={path}
                    className={`group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                      pathname.startsWith(path)
                        ? // ? "bg-gray-100 dark:bg-gray-700"
                          "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }`}
                  >
                    {Icon && (
                      <Icon
                        size={26}
                        className={`flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white ${
                          pathname.startsWith(path)
                            ? // ? "text-gray-900 dark:text-white"
                              ""
                            : // : "text-gray-500 dark:text-gray-400"
                              ""
                        }`}
                      />
                    )}

                    <span className="ml-3 capitalize">{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>settings</div>
        </div>
      </aside>
      <div className="flex-1">
        <ScrollArea className="h-full w-full p-2">{children}</ScrollArea>
      </div>
    </div>
  );
};

export default Layout;
