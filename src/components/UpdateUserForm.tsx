import { Box, Grid, TextField, Button } from "@mui/material";
import React from "react";
import ImageLinkGenerator from "./ImageLinkGenerator";
import UpdateUserInput from "../interfaces/UpdateUserInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface UpdateUserFormProps {
  updateForm: UpdateUserInput;
  handleUpdateFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
  handleUpdateFormClose: () => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  updateForm,
  handleUpdateFormChange,
  handleUpdate,
  handleUpdateFormClose,
}) => {
  return (
    <Box sx={style}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="name"
            label="Full name"
            name="name"
            value={updateForm.update.name}
            autoFocus
            onChange={handleUpdateFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={updateForm.update.email}
            autoFocus
            onChange={handleUpdateFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="addressLine1"
            label="Address Line 1"
            name="addressLine1"
            value={updateForm.update.addressLine1}
            autoFocus
            onChange={handleUpdateFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="addressLine2"
            label="Address Line 2"
            name="addressLine2"
            value={updateForm.update.addressLine2}
            autoFocus
            onChange={handleUpdateFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="postCode"
            label="Post Code"
            name="postCode"
            value={updateForm.update.postCode}
            autoFocus
            onChange={handleUpdateFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="city"
            label="City"
            name="city"
            value={updateForm.update.city}
            autoFocus
            onChange={handleUpdateFormChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="country"
            label="Country"
            name="country"
            value={updateForm.update.country}
            autoFocus
            onChange={handleUpdateFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="avatar"
            label="Avatar URL"
            name="avatar"
            value={updateForm.update.avatar}
            autoFocus
            onChange={handleUpdateFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ImageLinkGenerator />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3, mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Button
            size="large"
            fullWidth
            onClick={handleUpdateFormClose}
            variant="outlined"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            size="large"
            fullWidth
            onClick={handleUpdate}
            variant="contained"
            disabled={
              updateForm.update.name === "" ||
              updateForm.update.email === "" ||
              updateForm.update.avatar === "" ||
              updateForm.update.addressLine1 === "" ||
              updateForm.update.city === "" ||
              updateForm.update.country === ""
                ? true
                : false
            }
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateUserForm;
