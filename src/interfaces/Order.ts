import OrderProduct from "./OrderProduct";
import User from "./User";

interface Order {
  createdAt: Date,
  updatedAt: Date,
  id: string,
  user: User,
  orderProducts: OrderProduct[],
  orderStatus: string,
}

export default Order;