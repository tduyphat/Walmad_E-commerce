import OrderProductInput from "./OrderProductInput";

interface OrderInput {
  orderProducts: OrderProductInput[];
  orderStatus: string; 
}

export default OrderInput;