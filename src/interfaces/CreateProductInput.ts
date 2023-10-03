import Category from "./Category";

interface CreateProductInput {
  title: string;
  categoryId: number;
  price: number;
  description: string;
  images: string[];
}

export default CreateProductInput;