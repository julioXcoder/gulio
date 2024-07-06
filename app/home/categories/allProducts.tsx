import ProductCard from "@/app/home/categories/productCard";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductData } from "./data";

interface Props {
  products: ProductData[];
  handleSelectedProduct: (id: number) => void;
}

const AllProducts = ({ handleSelectedProduct, products }: Props) => {
  return (
    <>
      <div className="w-full flex px-20 justify-center items-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((item, index) => (
              <CarouselItem key={index} className="basis-[25%] group">
                <div className="p-1">
                  <Card>
                    <ProductCard
                      key={index}
                      item={item}
                      onProductSelect={handleSelectedProduct}
                    />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default AllProducts;
