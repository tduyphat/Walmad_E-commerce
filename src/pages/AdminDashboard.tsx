import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
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
import ImageLinkGenerator from "../components/ImageLinkGenerator";

const AdminDashboard = () => {
  const { products, loading } = useAppSelector(
    (state) => state.productsReducer
  );
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const [productUpdateId, setProductUpdateId] = useState<number>(1);
  const [editMode, setEditMode] = useState(false);

  const intialForm: any = {
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
  }, [sortType]);

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
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={form?.title}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
              value={form?.price}
              onChange={handleFormChange}
              inputProps={{
                min: 1,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="categoryId">Category</InputLabel>
              <Select
                id="categoryId"
                value={form?.categoryId.toString()}
                label="Category"
                onChange={() => handleFormChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="description"
              id="description"
              label="Description"
              value={form?.description}
              multiline
              rows={4}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="images"
              id="images"
              label="Image URLs"
              value={form?.images}
              multiline
              rows={4}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageLinkGenerator />
          </Grid>
          <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
            {editMode && (
              <Button
                onClick={handleCancelEdit}
                variant="contained"
                sx={{ mt: 3, mb: 2, marginRight: 2 }}
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2, width: 150 }}
              disabled={
                form.title === "" ||
                form.description === "" ||
                form.images === ""
                  ? true
                  : false
              }
            >
              {editMode ? "Edit product" : "Add product"}
            </Button>
          </Container>
        </Grid>
      </Box>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Images</TableCell>
                  <TableCell></TableCell>
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
