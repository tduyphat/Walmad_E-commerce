import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";

import useAppSelector from "../hooks/useAppSelector";
import AppPagination from "../components/AppPagination";
import FiltersContainer from "../components/FiltersContainer";
import SearchBox from "../components/SearchBox";
import ProductsLimiter from "../components/ProductsLimiter";
import ProductsSorter from "../components/ProductsSorter";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  createProductAsync,
  deleteProductAsync,
  sortByPrice,
  sortByTitle,
  updateProductAsync,
} from "../redux/reducers/productsReducers";
import Product from "../interfaces/Product";
import ProductInputForm from "../interfaces/ProductInputForm";
import ProductForm from "../components/ProductForm";
import ProductsTable from "../components/ProductsTable";

const AdminDashboard = () => {
  const { products, loading } = useAppSelector(
    (state) => state.productsReducer
  );
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const [productUpdateId, setProductUpdateId] = useState<number>(1);
  const [editMode, setEditMode] = useState(false);

  const intialForm: ProductInputForm = {
    title: "",
    price: 1,
    description: "",
    categoryId: categories[0].id,
    images: "",
  };

  const [form, setForm] = useState(intialForm);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchField, setSearchField] = useState("");
  const [sortType, setSortType] = useState("byTitleAsc");

  const dispatch = useAppDispatch();
  const confirm = useConfirm();

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
  }, [sortType, dispatch]);

  const handleLimitChange = (event: SelectChangeEvent<unknown>) => {
    const newPageSize = Number(event.target.value);
    setLimit(newPageSize);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const convertImagesStringToArray = (imagesString: string) => {
    return imagesString.split(", ").map((image) => image.trim());
  };

  const convertArrayImagesToString = (imagesArray: string[]) => {
    return imagesArray.join(", ");
  };

  const resetForm = () => {
    setForm(intialForm);
  };

  const createProduct = async () => {
    const result = await dispatch(
      createProductAsync({
        title: form.title,
        price: form.price,
        description: form.description,
        categoryId: form.categoryId,
        images: convertImagesStringToArray(form.images),
      })
    );
    if (result.payload?.hasOwnProperty("id")) {
      toast.success("Added new product!");
      resetForm();
    } else {
      toast.error("Cannot add product!");
    }
  };

  const updateProduct = async () => {
    const result = await dispatch(
      updateProductAsync({
        id: productUpdateId,
        update: {
          title: form.title,
          price: form.price,
          description: form.description,
          categoryId: form.categoryId,
          images: convertImagesStringToArray(form.images),
        },
      })
    );
    if (result.payload?.hasOwnProperty("id")) {
      toast.success("Product updated!");
      setEditMode(false);
      resetForm();
    } else {
      toast.error("Cannot update product!");
    }
  };

  const handleSubmit = () => {
    editMode ? updateProduct() : createProduct();
  };

  const switchToEditMode = (product: Product) => {
    setEditMode(true);
    setProductUpdateId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      categoryId: product.category.id,
      description: product.description,
      images: convertArrayImagesToString(product.images),
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    resetForm();
  };

  const handleDelete = (productId: number) => {
    confirm({
      description: `${
        products.find((product) => product.id === productId)?.title
      } will be deleted from the system.`,
    })
      .then(async () => {
        const result = await dispatch(deleteProductAsync(productId));
        if (typeof result.payload === "number") {
          toast.info("Deleted successfully!");
        } else {
          toast.error(result.payload as string);
        }
      })
      .catch(() => {
        return;
      });
  };

  return (
    <>
      <ProductForm
        form={form}
        categories={categories}
        editMode={editMode}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        handleCancelEdit={handleCancelEdit}
      />
      {!products && loading && <Typography>Loading...</Typography>}
      {!loading && products && (
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
          <ProductsTable
            filteredProducts={filteredProducts}
            currentPage={currentPage}
            limit={limit}
            editMode={editMode}
            switchToEditMode={switchToEditMode}
            handleDelete={handleDelete}
          />
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
