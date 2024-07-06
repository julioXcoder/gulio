import { getAllProducts } from "./actions";
import Container from "./container";
import { enumToString, enumArrayToValueLabelArray } from "@/lib/utils";

const Page = async () => {
  const { data, categories } = await getAllProducts();
  const categoryData = enumArrayToValueLabelArray(categories);

  const productCategories = [{ value: "all", label: "all" }, ...categoryData];

  return (
    <>
      <Container data={data} categories={productCategories} />
    </>
  );
};

export default Page;
