import { useState } from "react";
import { columns } from "./columns";
import { getProducts } from "./actions";
import AddProduct from "./addProduct";
import DataTable from "@/components/dataTable";

const Page = async () => {
  const data = await getProducts();

  return (
    <div>
      <div className="mx-auto mt-2">
        <DataTable
          addComponent={<AddProduct />}
          addButton={true}
          searchTerm="name"
          placeholder="Search product name..."
          title="Product list"
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
};

export default Page;
