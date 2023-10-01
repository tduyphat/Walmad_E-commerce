import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const FiltersContainer = (props: any) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            marginTop: "1em",
            marginBottom: "2em",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {props.children}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default FiltersContainer;