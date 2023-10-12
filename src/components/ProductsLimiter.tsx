import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import ProductsLimiterProps from "../interfaces/ProductsLimiterProps";

const ProductsLimiter: React.FC<ProductsLimiterProps> = ({
  limit,
  handleLimitChange,
}) => {
  return (
    <Box sx={{ minWidth: 120, marginLeft: "16px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Products/Page</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={limit}
          label="Products/Page"
          onChange={handleLimitChange}
        >
          <MenuItem value={"8"}>8</MenuItem>
          <MenuItem value={"16"}>16</MenuItem>
          <MenuItem value={"24"}>24</MenuItem>
          <MenuItem value={"32"}>32</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductsLimiter;