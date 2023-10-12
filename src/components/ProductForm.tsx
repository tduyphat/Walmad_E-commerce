import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import React from "react";
import ImageLinkGenerator from "./ImageLinkGenerator";
import ProductFormProps from "../interfaces/ProductFormProps";

const ProductForm: React.FC<ProductFormProps> = ({
  form,
  categories,
  editMode,
  handleFormChange,
  handleSubmit,
  handleCancelEdit,
}) => {
  const { title, price, description, categoryId, images } = form;
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            value={title}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="price"
            label="Price (€)"
            type="number"
            id="price"
            value={price}
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
              value={categoryId.toString()}
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
            value={description}
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
            value={images}
            multiline
            rows={4}
            onChange={handleFormChange}
            helperText="Input format: url1, url2, url3"
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
              title === "" || description === "" || images === "" ? true : false
            }
          >
            {editMode ? "Edit product" : "Add product"}
          </Button>
        </Container>
      </Grid>
    </Box>
  );
};

export default ProductForm;
