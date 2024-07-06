import React from "react";
import { ProductData } from "./data";
import SingleProductCard from "./singleProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

interface Props {
  products: ProductData[];
  handleSelectedProduct: (id: number) => void;
}

const FilteredProducts = ({ products, handleSelectedProduct }: Props) => {
  return (
    <div>
      {products.map((product) => (
        <SingleProductCard
          onProductSelect={handleSelectedProduct}
          item={product}
        />
      ))}
    </div>
  );
};

export default FilteredProducts;
