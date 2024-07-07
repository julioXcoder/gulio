"use client";

import Logo from "@/components/logo";
import { Path } from "@/types";
import { logoutAdmin } from "./actions";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  LogOut,
  ChevronRight,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { logoutUser } from "@/app/auth/login/action";

interface Props {
  username: string;
}

const Sidebar = ({ username }: Props) => {
  const pathname = usePathname();

  const links: Path[] = [
    // {
    //   title: "dashboard",
    //   Icon: LayoutGrid,
    //   path: "/admin/portal/dashboard",
    // },
    { title: "products", Icon: Package, path: "/admin/portal/products" },
    { title: "orders", Icon: ShoppingCart, path: "/admin/portal/orders" },
  ];

  const handleLogoutUser = async () => {
    await logoutAdmin();
  };

  return (
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center w-full text-lg font-semibold justify-between">
              <span className="flex gap-2 items-center">
                <User className="size-5 shrink-0" />
                {username}
              </span>
              <ChevronRight className="size-4 shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="right">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLogoutUser}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;
