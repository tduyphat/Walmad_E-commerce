import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import ProductsSorterProps from "../interfaces/ProductsSorterProps";

const ProductsSorter: React.FC<ProductsSorterProps> = ({
  sortType,
  handleSortTypeChange,
}) => {
  return (
    <Box sx={{ minWidth: 120, marginLeft: "16px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={sortType}
          label="Sort By"
          onChange={handleSortTypeChange}
        >
          <MenuItem value={"byTitleAsc"}>Name: A-Z</MenuItem>
          <MenuItem value={"byTitleDesc"}>Name: Z-A</MenuItem>
          <MenuItem value={"byPriceAsc"}>Price: Lowest</MenuItem>
          <MenuItem value={"byPriceDesc"}>Price: Highest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductsSorter;