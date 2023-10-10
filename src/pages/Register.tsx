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

import ImageLinkGenerator from "../components/ImageLinkGenerator";

interface ErrorResponse {
  message: string[];
  error: string;
  statusCode: number;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAvatar(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post("https://api.escuelajs.co/api/v1/users", {
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      });
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleNameChange(e)
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleEmailChange(e)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePasswordChange(e)
                  }
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleAvatarChange(e)
                  }
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
                name === "" || email === "" || password === "" || avatar === ""
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
