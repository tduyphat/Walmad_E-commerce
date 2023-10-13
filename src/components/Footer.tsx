import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/tduyphat">
        Phat Tran
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const StickyFooter = () => {
  return (
    <Container maxWidth="sm">
      <Copyright />
    </Container>
  );
};

export default StickyFooter;
