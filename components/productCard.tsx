import React from "react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import Image from "next/image";


type Image = { src: string; alt: string };

interface Props {
  item: {
    productTitle: string;
    productPrice: number;
    images: Image[];
  };
}



const ProductCard = ({ item }: Props) => {
  return (
    <div className="m-4 cursor-pointer">
      <Carousel className="group relative w-full max-w-xs">
        {/* FIXME: Go to card component */}
        <CarouselContent>
          {item.images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="overflow-hidden ">
                  <CardContent className="relative aspect-square">
                    <Image
                      src={image.src}
                      className="object-cover"
                      alt={image.alt}
                      fill
                      quality={100}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* <span
          className={`absolute right-4 top-4 inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ${
            item.room.availability
              ? "bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500"
              : "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500"
          }`}
        >
          {item.room.availability ? (
            <BsPatchCheckFill className="size-3 flex-shrink-0 animate-pulse" />
          ) : (
            <IoIosCloseCircle className="size-3 flex-shrink-0" />
          )}

          {item.room.availability ? "Available" : "Booked"}
        </span> */}

        <CarouselPrevious className="absolute left-4 top-1/2 hidden group-hover:flex" />
        <CarouselNext className="absolute right-4 top-1/2 hidden group-hover:flex" />
      </Carousel>
      <div className="mt-2">
        <p>{item.productTitle}</p>
        <p>{item.productPrice}</p>
      </div>
    </div>
  );
};

export default ProductCard;
