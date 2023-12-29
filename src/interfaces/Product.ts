import Category from "./Category";
import ProductImage from "./ProductImage";

interface Product {
  inventory: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: ProductImage[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Product;