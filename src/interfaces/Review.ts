import Product from "./Product";
import User from "./User";

interface Review {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  rating: number;
  content: string;
  user: User;
  product: Product;
}

export default Review;