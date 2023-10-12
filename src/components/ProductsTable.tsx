import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ProductsTableProps from "../interfaces/ProductsTableProps";

const ProductsTable: React.FC<ProductsTableProps> = ({
  filteredProducts,
  currentPage,
  limit,
  editMode,
  switchToEditMode,
  handleDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "5%" }}>ID</TableCell>
            <TableCell style={{ width: "15%" }}>Title</TableCell>
            <TableCell style={{ width: "5%" }}>Price</TableCell>
            <TableCell style={{ width: "20%" }}>Description</TableCell>
            <TableCell style={{ width: "15%" }}>Category</TableCell>
            <TableCell style={{ width: "30%" }}>Images</TableCell>
            <TableCell style={{ width: "10%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts
            .slice((currentPage - 1) * limit, currentPage * limit)
            .map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>
                  {product.images.map((image, index) => (
                    <p key={index}>{image}</p>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="warning"
                    onClick={() => switchToEditMode(product)}
                    disabled={editMode ? true : false}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product.id)}
                    disabled={editMode ? true : false}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;

