import { ReactNode } from "react";
import Sidebar from "./sidebar";
import { getAdminInfo } from "./actions";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  const { username } = await getAdminInfo();

  return (
    <div className="flex gap-3">
      <Sidebar username={username} />
      <div className="flex-1">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
