import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductData } from "./data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createBlob } from "@/lib/utils";

type Image = { src: string; alt: string };

interface Props {
  item: ProductData;
  onAddToCart: (id: number) => Promise<void>;
}

const ProductCard = ({ item, onAddToCart }: Props) => {
  return (
    <div className="m-4 cursor-pointer">
      <Carousel className="group relative w-full max-w-xs">
        {/* FIXME: Go to card component */}
        <CarouselContent>
          {item.productImagesData.map((imageData, index) => {
            let file = imageData.fileData;
            let type = imageData.fileType;
            let blobUrl = undefined;

            if (file && type) {
              const blob = createBlob(file, type);
              blobUrl = URL.createObjectURL(blob);
            }

            return (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden ">
                    <CardContent className="relative aspect-video">
                      <Image
                        src={blobUrl || ""}
                        className="object-cover"
                        alt="product image"
                        fill
                        quality={100}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 hidden group-hover:flex" />
        <CarouselNext className="absolute right-4 top-1/2 hidden group-hover:flex" />
      </Carousel>
      <div className="flex items-center h-10 mt-1 justify-between">
        <div className="">
          <p>{item.name}</p>
          <p>{item.price} Tsh</p>
        </div>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="outline">
            <Heart className="size-4 shrink-0 text-red-500" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => onAddToCart(item.id)}
          >
            <ShoppingCart className="size-4 shrink-0" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
