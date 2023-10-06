import CreateProductInput from "./CreateProductInput";

interface UpdateProductInput {
  update: Partial<CreateProductInput>;
  id: number;
}

export default UpdateProductInput;