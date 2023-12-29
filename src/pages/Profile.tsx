import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import useAppSelector from "../hooks/useAppSelector";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { currentUser } = useAppSelector((state) => state.usersReducer);

  return (
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
        {/* <Typography variant="body1" gutterBottom>
          Password:{" "}
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            value={currentUser?.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default Profile;
