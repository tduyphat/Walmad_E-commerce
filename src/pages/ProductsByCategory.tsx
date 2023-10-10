import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios, { AxiosError } from "axios";
import { SelectChangeEvent } from "@mui/material/Select";

import Product from "../interfaces/Product";
import CardsContainer from "../components/CardsContainer";
import ProductCard from "../components/ProductCard";
import FiltersContainer from "../components/FiltersContainer";
import SearchBox from "../components/SearchBox";
import ProductsSorter from "../components/ProductsSorter";
import AppPagination from "../components/AppPagination";
import ProductsLimiter from "../components/ProductsLimiter";

const ProductsByCategory = () => {
  const [productsByCategory, setProductsByCategory] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(productsByCategory);
  const [searchField, setSearchField] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoryName, setCatgoryName] = useState("");
  const [sortType, setSortType] = useState("byTitleAsc");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const { id } = useParams();

  const totalPages = Math.ceil(filteredProducts.length / Number(limit));

  const fetchProductsByCategory = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`
      );
      const products = result.data;
      products.sort((a: Product, b: Product) => a.title.localeCompare(b.title));
      setProductsByCategory(products);
      setLoading(false);
    } catch (e) {
      const error = e as AxiosError;
      setError(error.message);
    }
    setLoading(false);
  };

  const fetchCategoryName = async () => {
    try {
      const result = await axios.get(
        `https://api.escuelajs.co/api/v1/categories/${id}`
      );
      setCatgoryName(result.data.name);
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  };

  useEffect(() => {
    const filtered = productsByCategory?.filter((product) =>
      product.title.toLowerCase().includes(searchField)
    );
    setFilteredProducts(filtered);
  }, [productsByCategory, searchField]);

  useEffect(() => {
    fetchProductsByCategory();
    fetchCategoryName();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchField(searchTerm);
  };

  const handleSortTypeChange = (event: SelectChangeEvent) => {
    const newSortType = event.target.value as string;
    setSortType(newSortType);
    let sortedProducts = [...filteredProducts];
    if (newSortType === "byTitleAsc") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (newSortType === "byTitleDesc") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (newSortType === "byPriceAsc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const handleLimitChange = (event: SelectChangeEvent<unknown>) => {
    const newPageSize = Number(event.target.value);
    setLimit(newPageSize);
  };

  return (
    <>
      <Typography variant="h3" color="primary">{categoryName}</Typography>
      {!error && loading && <Typography>Loading...</Typography>}
      {!loading && error && <Typography>Error happens!</Typography>}

      {!error && !loading && productsByCategory.length > 0 ? (
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
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="primary">No products in this category.</Typography>
        </Box>
      )}
    </>
  );
};

export default ProductsByCategory;
