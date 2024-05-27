import ProductCard from "@/components/productCard";
import { ModeToggle } from "@/components/themeChanger";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

const items = [
  {
    productTitle: "shoes",
    productPrice: 13.6,
    images: [
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    productTitle: "sadas",
    productPrice: 4223.6,
    images: [
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
    ],
  },
  {
    productTitle: "asdasdas",
    productPrice: 213.6,
    images: [
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    productTitle: "shoes",
    productPrice: 13.6,
    images: [
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    productTitle: "sadas",
    productPrice: 4223.6,
    images: [
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
    ],
  },
  {
    productTitle: "asdasdas",
    productPrice: 213.6,
    images: [
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    productTitle: "shoes",
    productPrice: 13.6,
    images: [
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
  {
    productTitle: "sadas",
    productPrice: 4223.6,
    images: [
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
    ],
  },
  {
    productTitle: "asdasdas",
    productPrice: 213.6,
    images: [
      { src: "/products/shoes2.jpg", alt: "shoes 2" },
      { src: "/products/shoes1.jpg", alt: "shoes 1" },
      { src: "/products/shoes3.jpg", alt: "shoes 3" },
    ],
  },
];

const Page = () => {
  return (
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
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
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
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CaretDownIcon className="flex-shrink-0 size-5 ml-2 text-black dark:text-white" />
          </Button>
        </div>
      </nav>
      <div className="mt-6">
        <ModeToggle />
        {/* <ModeToggle />
        {items.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))} */}
        <div className="w-full flex px-10 justify-center items-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-5xl"
          >
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem key={index} className="basis-[25%]">
                  <div className="p-1">
                    <Card>
                      <ProductCard key={index} item={item} />
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
  );
};

export default Page;
