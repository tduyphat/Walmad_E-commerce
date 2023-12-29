import CreateProductInput from "./CreateProductInput";

interface UpdateProductInput {
  update: Partial<CreateProductInput>;
  id: string;
}

export default UpdateProductInput;