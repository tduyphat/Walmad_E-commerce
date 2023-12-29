import ProductImageCreate from "./ProductImageCreate";

interface CreateProductInput {
  inventory: number;
  title: string;
  price: number;
  description: string;
  categoryId: string; 
  images: ProductImageCreate[];
}

export default CreateProductInput;