"use client";

import { showErrorToast } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addToCart } from "./actions";
import AllProducts from "./allProducts";
import { ProductData } from "./data";
import FilteredProducts from "./filteredProducts";

interface Props {
  data: ProductData[];
  categories: {
    value: string;
    label: string;
  }[];
}

const Container = ({ data, categories }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  }>({ value: "all", label: "all" });
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const handleAddToCart = async (id: number) => {
    try {
      await addToCart(id);
      toast.success("Added to cart!", { duration: 6 });
    } catch (error) {
      showErrorToast();
    }
  };

  const handleSelectedCategory = (item: { value: string; label: string }) => {
    const category = categories.find(
      (category) => item.value == category.value
    );

    if (category) setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory.value === "all"
      ? products
      : products.filter(
          (product) => product.Category === selectedCategory.value
        );

  return (
    <div className="px-3 mt-2">
      <div className="flex items-center gap-1.5 mb-5">
        {categories.map((category) => (
          <span
            onClick={() => handleSelectedCategory(category)}
            className={`inline-flex cursor-pointer items-center gap-x-1.5 py-1.5 px-3 rounded-full capitalize font-medium  ${
              category.value === selectedCategory.value
                ? "bg-gray-800 text-white dark:bg-white dark:text-neutral-800"
                : "bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white"
            }`}
          >
            {category.label}
          </span>
        ))}
      </div>

      <div className="px-5">
        {selectedCategory.value === "all" ? (
          <AllProducts products={products} onAddToCart={handleAddToCart} />
        ) : (
          <FilteredProducts
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default Container;
