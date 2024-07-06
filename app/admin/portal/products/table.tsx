"use client";

import { useState } from "react";
import { ProductData } from "./columns";
import DataTable from "./dataTable";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { ChevronLeft } from "lucide-react";
import AddProduct from "./addProduct";

interface Props {
  data: ProductData[];
}

const Table = ({ data }: Props) => {
  const [showAddComponent, setShowAddComponent] = useState(false);

  const handleShowAddComponent = () => {
    setShowAddComponent(!showAddComponent);
  };

  return (
    <div>
      <div className="mx-auto mt-2">
        {!showAddComponent && (
          <DataTable
            onShowComponent={handleShowAddComponent}
            searchTerm="name"
            placeholder="Search product name..."
            title="Product list"
            columns={columns}
            data={data}
          />
        )}

        {showAddComponent && (
          <>
            <div className="flex items-center gap-4">
              <Button
                onClick={handleShowAddComponent}
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 capitalize shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Add product
              </h1>
            </div>

            <AddProduct onShowComponent={handleShowAddComponent} />
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
