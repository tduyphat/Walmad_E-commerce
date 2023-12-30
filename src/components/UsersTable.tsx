import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import User from "../interfaces/User";

interface UsersTableProps {
  filteredUsers: User[];
  currentPage: number;
  limit: number;
  handleUserRoleChange: (
    id: string
  ) => (event: SelectChangeEvent<string>) => void;
  handleUpdateFormOpen: (updateUser: User) => void;
  deleteUser: (id: string) => () => void;
}

const formatDateTime = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`;
};

const UsersTable: React.FC<UsersTableProps> = ({
  filteredUsers,
  currentPage,
  limit,
  handleUserRoleChange,
  handleUpdateFormOpen,
  deleteUser,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "5%" }}></TableCell>
            <TableCell style={{ width: "20%" }}>Name</TableCell>
            <TableCell style={{ width: "10%" }}>Role</TableCell>
            <TableCell style={{ width: "25%" }}>Email</TableCell>
            <TableCell style={{ width: "20%" }}>Date Joined</TableCell>
            <TableCell style={{ width: "10%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers
            .slice((currentPage - 1) * limit, currentPage * limit)
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar alt={user.name} src={user.avatar} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <Select
                      value={user.role}
                      onChange={handleUserRoleChange(user.id)}
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"Customer"}>Customer</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {formatDateTime(new Date(user.createdAt.toString()))}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="warning"
                    onClick={() => handleUpdateFormOpen(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={deleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
