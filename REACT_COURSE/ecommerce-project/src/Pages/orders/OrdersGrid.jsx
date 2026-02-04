import { OrderHeader } from "./OrderHeader";
import { Fragment } from "react";
import { OrderDetailsGrid } from "./OrderDetailsGrid";

export const OrdersGrid = ({ orders }) => {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order} />

            <OrderDetailsGrid order={order} />
          </div>
        );
      })}
    </div>
  );
};
