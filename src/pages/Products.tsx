import React, { useEffect, useState } from "react";
import { SelectChangeEvent, Typography } from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  sortByPrice,
  sortByTitle,
} from "../redux/reducers/productsReducers";
import Product from "../interfaces/Product";
import AppPagination from "../components/AppPagination";
import CardsContainer from "../components/CardsContainer";
import FiltersContainer from "../components/FiltersContainer";
import ProductCard from "../components/ProductCard";
import ProductsLimiter from "../components/ProductsLimiter";
import ProductsSorter from "../components/ProductsSorter";
import SearchBox from "../components/SearchBox";

const Products = () => {
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
      {!error && loading && <Typography>Loading...</Typography>}
      {!loading && error && <Typography>Error happens!</Typography>}

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
          <CardsContainer>
            {filteredProducts
              .slice((currentPage - 1) * limit, currentPage * limit)
              .map((product: Product) => (
                <ProductCard key={product.id} {...product} />
              ))}
          </CardsContainer>
          <AppPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default Products;
