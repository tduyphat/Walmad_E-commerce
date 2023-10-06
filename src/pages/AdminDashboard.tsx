import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SelectChangeEvent } from "@mui/material/Select";

import useAppSelector from "../hooks/useAppSelector";
import AppPagination from "../components/AppPagination";
import FiltersContainer from "../components/FiltersContainer";
import SearchBox from "../components/SearchBox";
import ProductsLimiter from "../components/ProductsLimiter";
import ProductsSorter from "../components/ProductsSorter";
import useAppDispatch from "../hooks/useAppDispatch";
import { sortByPrice, sortByTitle } from "../redux/reducers/productsReducers";

const AdminDashboard = () => {
  const { products, loading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchField, setSearchField] = useState("");
  const [sortType, setSortType] = useState("byTitleAsc");

  const dispatch = useAppDispatch();

  const totalPages = Math.ceil(filteredProducts.length / Number(limit));

  useEffect(() => {
    const filtered = products?.filter((product) =>
      product.title.toLowerCase().includes(searchField)
    );
    setFilteredProducts(filtered);
  }, [products, searchField]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchField(searchTerm);
  };

  const handleSortTypeChange = (event: SelectChangeEvent) => {
    setSortType(event.target.value as string);
  };

  useEffect(() => {
    if (sortType === "byTitleAsc") {
      dispatch(sortByTitle("asc"));
    } else if (sortType === "byTitleDesc") {
      dispatch(sortByTitle("desc"));
    } else if (sortType === "byPriceAsc") {
      dispatch(sortByPrice("asc"));
    } else {
      dispatch(sortByPrice("desc"));
    }
  }, [sortType]);

  const handleLimitChange = (event: SelectChangeEvent<unknown>) => {
    const newPageSize = Number(event.target.value);
    setLimit(newPageSize);
  };

  return (
    <>
      {!error && loading && <p>Loading...</p>}
      {!loading && error && <p>Error happens!</p>}
      {!error && !loading && products && (
        <>
          <FiltersContainer>
            <SearchBox handleSearch={handleSearch} />
            <ProductsLimiter
              limit={limit.toString()}
              handleLimitChange={handleLimitChange}
            />
            <ProductsSorter
              sortType={sortType}
              handleSortTypeChange={handleSortTypeChange}
            />
          </FiltersContainer>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Images</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts
                  .slice((currentPage - 1) * limit, currentPage * limit)
                  .map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell align="right">{product.title}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">{product.description}</TableCell>
                      <TableCell align="right">
                        {product.category.name}
                      </TableCell>
                      <TableCell align="right">
                        {product.images.map((image, index) => (
                          <p key={index}>{image}</p>
                        ))}
                      </TableCell>
                      <TableCell align="right">Delete Edit</TableCell> 
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default AdminDashboard;
