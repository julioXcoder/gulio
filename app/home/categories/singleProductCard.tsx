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

const SingleProductCard = ({ item, onAddToCart }: Props) => {
  let file = item.productImagesData[0].fileData;
  let type = item.productImagesData[0].fileType;
  let blobUrl = undefined;

  if (file && type) {
    const blob = createBlob(file, type);
    blobUrl = URL.createObjectURL(blob);
  }

  return (
    <div className="max-w-80">
      <div className="p-1">
        <Card className="overflow-hidden ">
          <CardContent className="relative aspect-[1/1]">
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

      <div className="flex flex-col gap-2">
        <h1>{item.name}</h1>
        <div className="flex w-full items-center justify-between">
          <h1>{item.price}</h1>
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
    </div>
  );
};

export default SingleProductCard;
