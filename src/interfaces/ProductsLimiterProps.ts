import { SelectChangeEvent } from "@mui/material";

interface ProductsLimiterProps {
  limit: string;
  handleLimitChange: (event: SelectChangeEvent)  => void;
}

export default ProductsLimiterProps;