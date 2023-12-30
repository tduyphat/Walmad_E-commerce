import React from "react";
import { Input } from "@mui/material";

interface SearchBarProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBarProps> = ({ handleSearch }) => {
  return (
    <>
      <Input
        placeholder="Search by name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
      />
    </>
  );
};

export default SearchBox;