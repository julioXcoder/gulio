import { getAllProducts } from "@/app/admin/portal/products/actions";
import CartContainer from "./cartContainer";

const Page = async () => {
  const products = await getAllProducts();

  return (
    <div className="px-5">
      <CartContainer items={products} />
    </div>
  );
};

export default Page;
