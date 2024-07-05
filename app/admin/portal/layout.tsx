"use client";

import { ReactNode } from "react";
import Logo from "@/components/logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Path } from "@/types";
import { ShoppingCart, Package, Truck, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  const links: Path[] = [
    {
      title: "dashboard",
      Icon: LayoutGrid,
      path: "/admin/portal/dashboard",
    },
    { title: "products", Icon: Package, path: "/admin/portal/products" },
    { title: "orders", Icon: ShoppingCart, path: "/admin/portal/orders" },
  ];

  return (
    <div className="flex gap-3">
      <aside className="w-52 h-screen p-3">
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
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
