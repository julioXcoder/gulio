import { getUserInfo } from "../actions";
import OrderContainer from "./orderContainer";

const Page = async () => {
  const { ordersWithItems } = await getUserInfo();

  return (
    <div>
      <OrderContainer data={ordersWithItems} />
    </div>
  );
};

export default Page;
