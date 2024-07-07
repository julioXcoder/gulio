import { getAllProducts } from "@/app/admin/portal/products/actions";
import CartContainer from "./cartContainer";
import { getUserInfo } from "../actions";

const Page = async () => {
  const { cartItems, location } = await getUserInfo();

  return (
    <div className="px-5">
      <CartContainer location={location} items={cartItems} />
    </div>
  );
};

export default Page;
