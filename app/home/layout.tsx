import Logo from "@/components/logo";
import { ReactNode } from "react";
import Navbar from "./navbar";
import { getUserInfo } from "./actions";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  const user = await getUserInfo();

  return (
    <div>
      <nav className="py-2 px-3 flex items-center justify-between">
        <Logo />
        <Navbar username={user.username} />
      </nav>

      {children}
    </div>
  );
};

export default Layout;
