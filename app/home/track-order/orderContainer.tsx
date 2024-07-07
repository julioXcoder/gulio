import React from "react";
import { ProductData } from "@/app/admin/portal/products/columns";
import { OrderItem, Order } from "@prisma/client";

interface Props {
  data: OrdersType[];
}

interface OrdersType extends Order {
  orderItems: OrderItemType[];
}

export interface OrderItemType extends OrderItem {
  product: ProductData;
}

const OrderContainer = ({ data }: Props) => {
  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight first:mt-0">
        My orders
      </h2>
      {data.map((order) => (
        <div key={order.id}>
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Order number {order.id}
          </h2>
          {order.orderItems.map((orderItem) => (
            <div key={orderItem.id}>
              <div>name: {orderItem.product.name}</div>
              <div>Quantity: {orderItem.quantity}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrderContainer;
