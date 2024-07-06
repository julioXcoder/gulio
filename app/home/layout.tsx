import Logo from "@/components/logo";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav className="py-2 px-3">
        <Logo />
      </nav>

      {children}
    </div>
  );
};

export default Layout;
