import { SelectChangeEvent, Typography, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import useAppDispatch from "../hooks/useAppDispatch";
import { useConfirm } from "material-ui-confirm";
import useAppSelector from "../hooks/useAppSelector";
import {
  deleteUserAsync,
  fetchAllUsersAsync,
  updateUserAsync,
  updateUserRoleAsync,
} from "../redux/reducers/usersReducer";
import AppPagination from "../components/AppPagination";
import FiltersContainer from "../components/FiltersContainer";
import ProductsLimiter from "../components/ProductsLimiter";
import SearchBox from "../components/SearchBox";
import UserRegisterInput from "../interfaces/UserRegisterInput";
import User from "../interfaces/User";
import UpdateUserForm from "../components/UpdateUserForm";
import UsersTable from "../components/UsersTable";

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const { users, loading } = useAppSelector((state) => state.usersReducer);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchField, setSearchField] = useState("");
  const [userUpdateId, setUserUpdateId] = useState("");

  const totalPages = Math.ceil(filteredUsers.length / Number(limit));

  const intialUpdateForm: Partial<UserRegisterInput> = {
    name: "",
    email: "",
    avatar: "",
    addressLine1: "",
    addressLine2: "",
    postCode: 0,
    city: "",
    country: "",
  };

  const [updateForm, setUpdateForm] = useState(intialUpdateForm);
  const [updateFormOpen, setUpdateFormOpen] = React.useState(false);

  const handleUpdateFormOpen = (updateUser: User) => {
    setUpdateFormOpen(true);
    setUpdateForm(updateUser);
    setUserUpdateId(updateUser.id);
  };
  const handleUpdateFormClose = () => {
    setUpdateFormOpen(false);
    setUpdateForm(intialUpdateForm);
    setUserUpdateId("");
  };

  const handleUpdateFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateForm({ ...updateForm, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchField)
    );
    setFilteredUsers(filtered);
  }, [users, searchField]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchField(searchTerm);
  };

  const handleLimitChange = (event: SelectChangeEvent<unknown>) => {
    const newPageSize = Number(event.target.value);
    setLimit(newPageSize);
  };

  const deleteUser = (id: string) => () => {
    confirm({
      description: "This user will be deleted.",
    })
      .then(() => {
        dispatch(deleteUserAsync(id));
      })
      .catch(() => {
        return;
      });
  };

  const updateUser = () => async () => {
    const result = await dispatch(
      updateUserAsync({
        id: userUpdateId,
        update: updateForm,
      })
    );
    if (result.payload?.hasOwnProperty("id")) {
      toast.success("User updated!");
      handleUpdateFormClose();
    } else {
      toast.error("Cannot update user!");
    }
  };

  const handleUserRoleChange =
    (id: string) => (event: SelectChangeEvent<string>) => {
      const newUserRole = event.target.value as string;
      dispatch(updateUserRoleAsync({ id, update: { role: newUserRole } }));
    };

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, []);

  return (
    <>
      {!users && loading && <Typography>Loading...</Typography>}
      {!loading && users && (
        <>
          <FiltersContainer>
            <SearchBox handleSearch={handleSearch} />
            <ProductsLimiter
              limit={limit.toString()}
              handleLimitChange={handleLimitChange}
            />
          </FiltersContainer>
          <UsersTable
            filteredUsers={filteredUsers}
            currentPage={currentPage}
            limit={limit}
            handleUserRoleChange={handleUserRoleChange}
            handleUpdateFormOpen={handleUpdateFormOpen}
            deleteUser={deleteUser}
          />
        </>
      )}
      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Modal open={updateFormOpen} onClose={handleUpdateFormClose}>
        <UpdateUserForm
          updateForm={updateForm}
          handleUpdateFormChange={handleUpdateFormChange}
          updateUser={updateUser}
          handleUpdateFormClose={handleUpdateFormClose}
        />
      </Modal>
    </>
  );
};

export default UserDashboard;
