import React from "react";
import { ProductData } from "./data";
import SingleProductCard from "./singleProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

interface Props {
  products: ProductData[];
  onAddToCart: (id: number) => Promise<void>;
}

const FilteredProducts = ({ products, onAddToCart }: Props) => {
  return (
    <div>
      {products.map((product) => (
        <SingleProductCard onAddToCart={onAddToCart} item={product} />
      ))}
    </div>
  );
};

export default FilteredProducts;
