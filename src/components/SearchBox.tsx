import React from "react";
import { Input } from "@mui/material";

import SearchBarProps from "../interfaces/SearchBarProps";

const SearchBox: React.FC<SearchBarProps> = ({ handleSearch }) => {
  return (
    <>
      <Input
        placeholder="Search product"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
      />
    </>
  );
};

export default SearchBox;