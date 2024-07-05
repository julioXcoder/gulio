"use client";

import ProductCard from "@/components/productCard";
import { ModeToggle } from "@/components/themeChanger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  MoveLeft,
  CreditCard,
  HandCoins,
  Smartphone,
  ShoppingCart,
  Heart,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Hero from "@/components/hero";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  BackpackIcon,
  BellIcon,
  CaretDownIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

interface Product {
  id: number;
  productTitle: string;
  productPrice: number;
  images: { src: string; alt: string }[];
}

const items: Product[] = [
  {
    id: 1,
    productTitle: "shoes",
    productPrice: 13.6,
    images: [
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    id: 2,
    productTitle: "sadas",
    productPrice: 4223.6,
    images: [
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
    ],
  },
  {
    id: 3,
    productTitle: "asdasdas",
    productPrice: 213.6,
    images: [
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    id: 4,
    productTitle: "shoes",
    productPrice: 13.6,
    images: [
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    id: 5,
    productTitle: "sadas",
    productPrice: 4223.6,
    images: [
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
    ],
  },
  {
    id: 6,
    productTitle: "asdasdas",
    productPrice: 213.6,
    images: [
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    id: 7,
    productTitle: "shoes",
    productPrice: 13.6,
    images: [
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    id: 8,
    productTitle: "sadas",
    productPrice: 4223.6,
    images: [
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
    ],
  },
  {
    id: 9,
    productTitle: "asdasdas",
    productPrice: 213.6,
    images: [
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
];

const paymentMethods = [
  { title: "pay with card", value: "card", Icon: CreditCard },
  { title: "pay with m-pesa", value: "phone", Icon: Smartphone },
  { title: "pay with cash", value: "cash", Icon: HandCoins },
];

const Page = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(items);

  const handleSelectedProduct = (id: number) => {
    const product = products.find((item) => item.id == id);

    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <>
      {selectedProduct ? (
        <div>
          <div className="flex justify-between">
            <Button onClick={() => setSelectedProduct(null)}>
              <MoveLeft className="shrink-0 mr-2" />
              Back
            </Button>
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {selectedProduct.productTitle}
            </h2>
          </div>
          <div className="grid grid-cols-6 gap-10 my-3">
            <div className="col-span-3 flex flex-col gap-7">
              <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Shipping details
                </h4>
                <Card>
                  <CardHeader>
                    <CardTitle>Address Book</CardTitle>
                    <CardDescription className="w-full flex items-center justify-between">
                      <span>Tanzania, Mbeya Iyunga Ikuti</span>
                      <Button variant="secondary" size="sm">
                        change
                      </Button>
                    </CardDescription>
                  </CardHeader>
                  {/* <CardContent>Tanzania, Mbeya Iyunga Ikuti</CardContent> */}
                </Card>
              </div>
              <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Contact info
                </h4>
                <Card>
                  <CardHeader>
                    <CardTitle>Email</CardTitle>
                    <CardDescription className="w-full flex items-center justify-between">
                      <span>userEmail@gmail.com</span>
                    </CardDescription>
                  </CardHeader>
                  {/* <CardContent>Tanzania, Mbeya Iyunga Ikuti</CardContent> */}
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Phone number</CardTitle>
                    <CardDescription className="w-full flex items-center justify-between">
                      <span>+255798340941</span>
                    </CardDescription>
                  </CardHeader>
                  {/* <CardContent>Tanzania, Mbeya Iyunga Ikuti</CardContent> */}
                </Card>
              </div>
              <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Payment methods
                </h4>
                <Card className="p-2">
                  <RadioGroup defaultValue="card">
                    {paymentMethods.map(({ title, value, Icon }, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Icon className="mr-2 shrink-0" />
                          <Label htmlFor="r1">{title}</Label>
                        </div>
                        <RadioGroupItem value={value} id={value} />
                      </div>
                    ))}
                  </RadioGroup>
                </Card>
              </div>
            </div>
            <div className="col-span-3">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Order Details
              </h4>
              <div className="flex gap-5 px-2">
                <div className="min-w-40">
                  <AspectRatio ratio={3 / 2}>
                    <Image
                      src={selectedProduct.images[0].src}
                      alt="Image"
                      fill
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col gap-1">
                    <span>{selectedProduct.productTitle}</span>
                    {/* <span>{selectedProduct.productPrice}</span> */}
                    <span>product description</span>
                  </div>
                  <div>{selectedProduct.productPrice}</div>
                </div>
              </div>
              <Separator className="my-6 h-1" />
              <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Summary
                </h4>
                <div className="flex items-center justify-between">
                  <h4 className="font-medium ps-1">Sub total</h4>
                  <p className="font-sans">20</p>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-medium ps-1">Estimated delivery</h4>
                  <p className="font-sans">2</p>
                </div>
              </div>
              <Separator className="my-6 h-1" />
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-medium ps-1">Total</h4>
                  <p className="font-sans">2</p>
                </div>
              </div>
              <Separator className="my-6 h-1" />
              <Button className="w-full" size="lg">
                make Payment
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <nav className="w-full h-8 grid gap-2 grid-cols-6">
            <div className="px-2 py-1 gap-2 flex items-center col-span-4 h-full clear-start rounded-2xl bg-gray-200 dark:bg-gray-800 relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="!rounded-xl">
                    category
                    <CaretDownIcon className="flex-shrink-0 size-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Keyboard shortcuts
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        Invite users
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Email</DropdownMenuItem>
                          <DropdownMenuItem>Message</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                      New Team
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem disabled>API</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Input className="flex-1" placeholder="search..." />
              <MagnifyingGlassIcon className="flex-shrink-0 absolute right-3 size-6" />
            </div>
            <div className="col-span-2 flex justify-evenly items-center">
              <BellIcon className="flex-shrink-0 size-5" />
              <HeartIcon className="flex-shrink-0 size-5" />
              <BackpackIcon className="flex-shrink-0 size-5" />
              <Button className="!bg-transparent !shadow-none">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CaretDownIcon className="flex-shrink-0 size-5 ml-2 text-black dark:text-white" />
              </Button>
            </div>
          </nav>
          <div className="">
            {/* <ModeToggle /> */}
            <Hero />
            <div className="w-full flex px-10 justify-center items-center">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-5xl"
              >
                <CarouselContent>
                  {items.map((item, index) => (
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
          </div>
        </>
      )}
    </>
  );
};

export default Page;
