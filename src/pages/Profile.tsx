import React from "react";
import Grid from "@mui/material/Grid";

import useAppSelector from "../hooks/useAppSelector";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import { title } from "process";

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.usersReducer);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <CardMedia
          component="img"
          alt={currentUser?.name}
          height="400"
          image={currentUser?.avatar}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: 400,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            {currentUser?.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {currentUser?.email}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            {currentUser?.role}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Profile;
