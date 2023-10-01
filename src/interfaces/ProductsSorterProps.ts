import { SelectChangeEvent } from "@mui/material";

interface ProductsSorterProps {
  sortType: string;
  handleSortTypeChange: (event: SelectChangeEvent)  => void;
}

export default ProductsSorterProps;