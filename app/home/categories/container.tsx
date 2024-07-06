"use client";

import { CreditCard, HandCoins, Smartphone } from "lucide-react";
import { useState } from "react";
import { ProductData } from "./data";
import AllProducts from "./allProducts";
import FilteredProducts from "./filteredProducts";

const paymentMethods = [
  { title: "pay with card", value: "card", Icon: CreditCard },
  { title: "pay with m-pesa", value: "phone", Icon: Smartphone },
  { title: "pay with cash", value: "cash", Icon: HandCoins },
];

interface Props {
  data: ProductData[];
  categories: {
    value: string;
    label: string;
  }[];
}

const Container = ({ data, categories }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  }>({ value: "all", label: "all" });
  const [products, setProducts] = useState<ProductData[]>(data);

  const handleSelectedProduct = (id: number) => {
    const product = products.find((item) => item.id == id);

    if (product) {
      setSelectedProduct(product);
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
          <AllProducts
            products={products}
            handleSelectedProduct={handleSelectedProduct}
          />
        ) : (
          <FilteredProducts
            products={filteredProducts}
            handleSelectedProduct={handleSelectedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default Container;

// <div>{selectedProduct ? (
//   <div>
//     <div className="flex justify-between">
//       <Button onClick={() => setSelectedProduct(null)}>
//         <MoveLeft className="shrink-0 mr-2" />
//         Back
//       </Button>
//       <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
//         {selectedProduct.name}
//       </h2>
//     </div>
//     <div className="grid grid-cols-6 gap-10 my-3">
//       <div className="col-span-3 flex flex-col gap-7">
//         <div>
//           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//             Shipping details
//           </h4>
//           <Card>
//             <CardHeader>
//               <CardTitle>Address Book</CardTitle>
//               <CardDescription className="w-full flex items-center justify-between">
//                 <span>Tanzania, Mbeya Iyunga Ikuti</span>
//                 <Button variant="secondary" size="sm">
//                   change
//                 </Button>
//               </CardDescription>
//             </CardHeader>
//             {/* <CardContent>Tanzania, Mbeya Iyunga Ikuti</CardContent> */}
//           </Card>
//         </div>
//         <div>
//           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//             Contact info
//           </h4>
//           <Card>
//             <CardHeader>
//               <CardTitle>Email</CardTitle>
//               <CardDescription className="w-full flex items-center justify-between">
//                 <span>userEmail@gmail.com</span>
//               </CardDescription>
//             </CardHeader>
//             {/* <CardContent>Tanzania, Mbeya Iyunga Ikuti</CardContent> */}
//           </Card>
//         </div>
//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Phone number</CardTitle>
//               <CardDescription className="w-full flex items-center justify-between">
//                 <span>+255798340941</span>
//               </CardDescription>
//             </CardHeader>
//             {/* <CardContent>Tanzania, Mbeya Iyunga Ikuti</CardContent> */}
//           </Card>
//         </div>
//         <div>
//           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//             Payment methods
//           </h4>
//           <Card className="p-2">
//             <RadioGroup defaultValue="card">
//               {paymentMethods.map(({ title, value, Icon }, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between"
//                 >
//                   <div className="flex items-center">
//                     <Icon className="mr-2 shrink-0" />
//                     <Label htmlFor="r1">{title}</Label>
//                   </div>
//                   <RadioGroupItem value={value} id={value} />
//                 </div>
//               ))}
//             </RadioGroup>
//           </Card>
//         </div>
//       </div>
//       <div className="col-span-3">
//         <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//           Order Details
//         </h4>
//         <div className="flex gap-5 px-2">
//           <div className="min-w-40">
//             <AspectRatio ratio={3 / 2}>
//               <Image
//                 src={selectedProduct.images[0].src}
//                 alt="Image"
//                 fill
//                 className="rounded-md object-cover"
//               />
//             </AspectRatio>
//           </div>
//           <div className="flex flex-col justify-between">
//             <div className="flex flex-col gap-1">
//               <span>{selectedProduct.productTitle}</span>
//               {/* <span>{selectedProduct.productPrice}</span> */}
//               <span>product description</span>
//             </div>
//             <div>{selectedProduct.productPrice}</div>
//           </div>
//         </div>
//         <Separator className="my-6 h-1" />
//         <div>
//           <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//             Summary
//           </h4>
//           <div className="flex items-center justify-between">
//             <h4 className="font-medium ps-1">Sub total</h4>
//             <p className="font-sans">20</p>
//           </div>
//           <div className="flex items-center justify-between">
//             <h4 className="font-medium ps-1">Estimated delivery</h4>
//             <p className="font-sans">2</p>
//           </div>
//         </div>
//         <Separator className="my-6 h-1" />
//         <div>
//           <div className="flex items-center justify-between">
//             <h4 className="font-medium ps-1">Total</h4>
//             <p className="font-sans">2</p>
//           </div>
//         </div>
//         <Separator className="my-6 h-1" />
//         <Button className="w-full" size="lg">
//           make Payment
//         </Button>
//       </div>
//     </div>
//   </div>
// ) : (

// )}</div>
