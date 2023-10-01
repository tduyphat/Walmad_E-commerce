import React from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

import AppPaginationProps from "../interfaces/AppPaginationProps";

const AppPagination: React.FC<AppPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onPageChange(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0px",
      }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default AppPagination;