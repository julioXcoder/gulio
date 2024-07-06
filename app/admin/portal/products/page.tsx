import { getAllProducts } from "./actions";
import Table from "./table";

const Page = async () => {
  const data = await getAllProducts();

  return (
    <div>
      <Table data={data} />
    </div>
  );
};

export default Page;
