import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios, { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";

import ImageLinkGenerator from "../components/ImageLinkGenerator";
import UserRegisterInput from "../interfaces/UserRegisterInput";

interface ErrorResponse {
  message: string[];
  error: string;
  statusCode: number;
}

const Register = () => {
  const intialForm: UserRegisterInput = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };
  const [form, setForm] = useState(intialForm);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post(
        "https://api.escuelajs.co/api/v1/users",
        form
      );
      if (result.status === 201) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (e: any) {
      const errorResponse = e.response?.data as ErrorResponse;
      errorResponse.message.map((message: string) => toast.error(message));
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  label="Full name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
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
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="avatar"
                  label="Avatar URL"
                  name="avatar"
                  autoComplete="avatar"
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <ImageLinkGenerator />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                form.name === "" ||
                form.email === "" ||
                form.password === "" ||
                form.avatar === ""
                  ? true
                  : false
              }
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
