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
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";
import jwt from "jwt-decode";

import ImageLinkGenerator from "../components/ImageLinkGenerator";
import UserRegisterInput from "../interfaces/UserRegisterInput";
import GoogleProfile from "../interfaces/GoogleProfile";

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
    role: "",
    addressLine1: "",
    addressLine2:"",
    postCode: 0,
    city: "",
    country: ""
  };
  const [form, setForm] = useState(intialForm);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_CLIENT_ID!;

  const handleGoogleLogin = (cred: CredentialResponse) => {
    const token = cred.credential;
    if (token) {
      const userProfile = jwt<GoogleProfile>(token);
      setForm({
        ...form,
        name: userProfile.name,
        email: userProfile.email,
        avatar: userProfile.picture,
      });
    } else {
      toast.error("Can't get data from your Google account!");
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}api/v1/users`,
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
                  value={form.name}
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
                  value={form.email}
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  value={form.password}
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
                  id="addressLine1"
                  label="Address Line 1"
                  name="addressLine1"
                  value={form.addressLine1}
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="addressLine2"
                  label="Address Line 2"
                  name="addressLine2"
                  value={form.addressLine2}
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="postCode"
                  label="Post Code"
                  name="postCode"
                  value={form.postCode}
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={form.city}
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  value={form.country}
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="avatar"
                  label="Avatar URL"
                  name="avatar"
                  value={form.avatar}
                  autoFocus
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <ImageLinkGenerator />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 3, mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <GoogleOAuthProvider clientId={clientId}>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      toast.error("Login failed!");
                    }}
                  />
                </GoogleOAuthProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                  variant="contained"
                  disabled={
                    form.name === "" ||
                    form.email === "" ||
                    form.password === "" ||
                    form.avatar === ""
                      ? true
                      : false
                  }
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
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
