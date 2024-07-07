import Image from "next/image";
import Link from "next/link";
import logo from "@/public/gulioLogo.png";

const Logo = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-x-2 font-semibold lg:text-xl dark:text-white"
    >
      <Image
        quality={100}
        className="h-10 w-auto"
        src={logo}
        alt="smart logo"
      />
      GULIO
    </Link>
  );
};

export default Logo;
