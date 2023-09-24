import Category from "./Category";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category
}

export default Product;