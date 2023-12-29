import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Modal,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";

import useAppSelector from "../hooks/useAppSelector";
import UpdateUserInput from "../interfaces/UpdateUserInput";
import { logOut, updateUserAsync } from "../redux/reducers/usersReducer";
import useAppDispatch from "../hooks/useAppDispatch";
import UpdateUserForm from "../components/UpdateUserForm";
import PasswordChangeForm from "../components/PasswordChangeForm";

const Profile = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { currentUser } = useAppSelector((state) => state.usersReducer);

  const intialUpdateForm: UpdateUserInput = {
    id: currentUser!.id,
    update: {
      name: currentUser!.name,
      email: currentUser!.email,
      avatar: currentUser!.avatar,
      addressLine1: currentUser!.addressLine1,
      addressLine2: currentUser!.addressLine2,
      postCode: currentUser!.postCode,
      city: currentUser!.city,
      country: currentUser!.country,
    },
  };

  const initialPasswordForm = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [updateForm, setUpdateForm] = useState(intialUpdateForm);
  const [updateFormOpen, setUpdateFormOpen] = React.useState(false);
  const handleUpdateFormOpen = () => setUpdateFormOpen(true);
  const handleUpdateFormClose = () => setUpdateFormOpen(false);

  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
  const [passwordFormOpen, setPasswordFormOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordFormOpen = () => setPasswordFormOpen(true);
  const handlePasswordFormClose = () => setPasswordFormOpen(false);

  const handleUpdateFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setUpdateForm((prevForm) => ({
      ...prevForm,
      update: {
        ...prevForm.update,
        [name]: value,
      },
    }));
  };

  const handlePasswordFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordForm({
      ...passwordForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    const result = await dispatch(
      updateUserAsync({
        id: currentUser!.id,
        update: updateForm.update,
      })
    );
    if (result.payload?.hasOwnProperty("id")) {
      toast.success("User updated!");
      handleUpdateFormClose();
    } else {
      toast.error("Cannot update user!");
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.patch(
        `${process.env.REACT_APP_API_URL}api/v1/users/update-password/${intialUpdateForm.id}`,
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data === true) {
        toast.success("Password updated!");
        handlePasswordFormClose();
      }
    } catch (e) {
      toast.error("Can't change password!");
    }
  };

  const handleDeleteProfile = async () => {
    confirm({
      description: "Your profile and all the data will be deleted from the system.",
    })
      .then(async () => {
        const token = localStorage.getItem("access_token");
        const result = await axios.delete(
          `${process.env.REACT_APP_API_URL}api/v1/users/${intialUpdateForm.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.data === true) {
          dispatch(logOut());
          localStorage.removeItem("access_token");
          toast.info("Profile deleted.");
        }
      })
      .catch(() => {
        return;
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Card style={{ width: "50%", margin: "0 auto" }}>
        <CardHeader
          avatar={
            <Avatar
              src={currentUser?.avatar}
              alt={currentUser?.name}
              sx={{ width: 200, height: 200 }}
            />
          }
        />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Name: {currentUser?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            ID: {currentUser?.id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Role: {currentUser?.role}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {currentUser?.email}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
            <Button onClick={handleUpdateFormOpen} variant="contained">
              Update Profile
            </Button>
            <Button onClick={handlePasswordFormOpen} variant="contained">
              Change Password
            </Button>
            <Button
              onClick={handleDeleteProfile}
              variant="contained"
              color="error"
            >
              Delete Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Modal open={updateFormOpen} onClose={handleUpdateFormClose}>
        <UpdateUserForm
          updateForm={updateForm}
          handleUpdateFormChange={handleUpdateFormChange}
          handleUpdate={handleUpdate}
          handleUpdateFormClose={handleUpdateFormClose}
        />
      </Modal>
      <Modal open={passwordFormOpen} onClose={handlePasswordFormClose}>
        <PasswordChangeForm
          passwordForm={passwordForm}
          showPassword={showPassword}
          handleTogglePasswordVisibility={handleTogglePasswordVisibility}
          handlePasswordFormChange={handlePasswordFormChange}
          handlePasswordFormClose={handlePasswordFormClose}
          handleChangePassword={handleChangePassword}
        />
      </Modal>
    </>
  );
};

export default Profile;
