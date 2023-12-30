import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useAppSelector from "../hooks/useAppSelector";
import UpdateUserInput from "../interfaces/UpdateUserInput";
import { logOut, updateUserAsync } from "../redux/reducers/usersReducer";
import useAppDispatch from "../hooks/useAppDispatch";
import UpdateUserForm from "../components/UpdateUserForm";
import PasswordChangeForm from "../components/PasswordChangeForm";
import Order from "../interfaces/Order";

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

  const [orders, setOrders] = React.useState<Order[]>([]);

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
      description:
        "Your profile and all the data will be deleted from the system.",
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

  const fetchOrdersByUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const result = await axios.get(
        `${process.env.REACT_APP_API_URL}api/v1/orders/user/${currentUser?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(result.data);
    } catch (e) {
      toast.error("Can't load orders!");
    }
  };

  const formatDateTime = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Ensure leading zeros for single-digit days, months, hours, and minutes
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}`;
  };

  const cancelOrder = async (id: string) => {
    confirm({
      description: "Your order will be cancelled.",
    })
      .then(async () => {
        const token = localStorage.getItem("access_token");
        const result = await axios.patch(
          `${process.env.REACT_APP_API_URL}api/v1/orders/cancel-order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.data === true) {
          toast.success("Order cancelled!");
          const foundIndex = orders.findIndex((order) => order.id === id);
          if (foundIndex >= 0) {
            setOrders([
              ...orders.slice(0, foundIndex),
              { ...orders[foundIndex], orderStatus: "Cancelled" },
              ...orders.slice(foundIndex + 1),
            ]);
          }
        } else {
          toast.error("Can't cancel order!");
        }
      })
      .catch(() => {
        return;
      });
  };

  useEffect(() => {
    fetchOrdersByUser();
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card style={{ margin: "0 auto" }}>
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
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <Button
                  onClick={handleUpdateFormOpen}
                  variant="contained"
                  size="small"
                >
                  Update Profile
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  onClick={handlePasswordFormOpen}
                  variant="contained"
                  size="small"
                >
                  Change Password
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  onClick={handleDeleteProfile}
                  variant="contained"
                  color="error"
                  size="small"
                >
                  Delete Profile
                </Button>
              </Grid>
            </Grid>
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
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" color="primary" gutterBottom>
          Order History
        </Typography>
        {orders.length > 0 ? (
          orders.map((order) => {
            const orderDate = new Date(order.createdAt.toString());
            const currentTime = new Date();
            const timeDifference =
              (currentTime.valueOf() - orderDate.valueOf()) / (1000 * 60 * 60);
            return (
              <Accordion key={order.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    Order Date:{" "}
                    {formatDateTime(new Date(order.createdAt.toString()))}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List disablePadding>
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText primary="Order ID" />
                      <Typography variant="subtitle1">{order.id}</Typography>
                    </ListItem>
                    {order.orderProducts.map((orderProduct) => (
                      <ListItem
                        key={orderProduct.product.id}
                        sx={{ py: 1, px: 0 }}
                      >
                        <ListItemText
                          primary={orderProduct.product.title}
                          secondary={`Quantity: ${orderProduct.quantity}`}
                        />
                        <Typography variant="body2">
                          €{orderProduct.product.price * orderProduct.quantity}
                        </Typography>
                      </ListItem>
                    ))}
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText primary="Total" />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        €
                        {order.orderProducts.reduce(
                          (acc, curr) =>
                            acc + curr.product.price * curr.quantity,
                          0
                        )}
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText primary="Order Status" />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700 }}
                        color={
                          order.orderStatus === "Cancelled"
                            ? "error"
                            : "primary"
                        }
                      >
                        {order.orderStatus}
                      </Typography>
                    </ListItem>
                    {timeDifference < 2 && order.orderStatus !== "Cancelled" && (
                      <ListItem sx={{ py: 1, px: 0 }}>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel Order
                        </Button>
                      </ListItem>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="primary">
              You have not placed any order.
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Profile;
