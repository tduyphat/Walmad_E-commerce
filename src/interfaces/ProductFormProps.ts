import { SelectChangeEvent } from "@mui/material";
import Category from "./Category";
import ProductInputForm from "./ProductInputForm";

interface ProductFormProps {
  form: ProductInputForm;
  categories: Category[];
  editMode: boolean;
  handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: SelectChangeEvent<string>) => void;
  handleSubmit: () => void;
  handleCancelEdit: () => void;
}

export default ProductFormProps;