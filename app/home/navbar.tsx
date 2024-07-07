"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Path } from "@/types";
import {
  ChevronDown,
  LayoutGrid,
  LogOut,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "../auth/login/action";

const links: Path[] = [
  {
    title: "categories",
    Icon: LayoutGrid,
    path: "/home/categories",
  },
  { title: "cart", Icon: ShoppingCart, path: "/home/cart" },
  { title: "track order", Icon: Truck, path: "/home/track-order" },
];

interface Props {
  username: string;
}

const Navbar = ({ username }: Props) => {
  const pathname = usePathname();

  const handleLogoutUser = async () => {
    await logoutUser();
  };

  return (
    <div className="flex items-center gap-3">
      {links.map(({ Icon, path }, index) => (
        <Link href={path} key={index} className="inline-block">
          <button
            className={`hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent  ${
              pathname.startsWith(path)
                ? "text-gray-500 bg-gray-100 dark:text-neutral-400 dark:bg-neutral-700"
                : "hover:bg-gray-100 hover:dark:bg-neutral-700"
            }`}
          >
            <Icon className="flex-shrink-0 size-4" />
          </button>
        </Link>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center text-lg font-semibold gap-3">
            <span className="flex gap-2 items-center">
              <User className="size-5 shrink-0" />
              {username}
            </span>{" "}
            <ChevronDown className="size-4 shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
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
  );
};

export default Navbar;
