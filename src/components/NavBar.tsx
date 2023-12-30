import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import TocIcon from "@mui/icons-material/Toc";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { logOut } from "../redux/reducers/usersReducer";
import DarkModeToggle from "./DarkToggleMode";

const pages = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Products",
    path: "/products",
  },
];

const authenticate = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Register",
    path: "/register",
  },
];

const NavBar = ({
  setCartOpen,
}: {
  setCartOpen: (cartOpen: boolean) => void;
}) => {
  const cart = useAppSelector((state) => state.cartReducer);
  const { currentUser } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("access_token");
    toast.info("Logged out!");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FilterVintageIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WALMAD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate(page.path)}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <FilterVintageIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WALMAD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  navigate(page.path);
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {currentUser ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={currentUser.name} src={currentUser.avatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <AccountCircleIcon
                      sx={{ marginRight: 1, fontSize: "medium" }}
                    />
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  {currentUser?.role === "Admin" && (
                    <Box>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <TocIcon sx={{ marginRight: 1, fontSize: "medium" }} />
                        <Typography
                          onClick={() => navigate("/product-dashboard")}
                          textAlign="center"
                        >
                          Products
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <TocIcon sx={{ marginRight: 1, fontSize: "medium" }} />
                        <Typography
                          onClick={() => navigate("/user-dashboard")}
                          textAlign="center"
                        >
                          Users
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <TocIcon sx={{ marginRight: 1, fontSize: "medium" }} />
                        <Typography
                          onClick={() => navigate("/order-dashboard")}
                          textAlign="center"
                        >
                          Orders
                        </Typography>
                      </MenuItem>
                    </Box>
                  )}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <LogoutIcon sx={{ marginRight: 1, fontSize: "medium" }} />
                    <Typography onClick={handleLogout} textAlign="center">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {authenticate.map((auth) => (
                  <Button
                    key={auth.title}
                    onClick={() => navigate(auth.path)}
                    sx={{
                      color: "white",
                      display: "block",
                    }}
                  >
                    {auth.title}
                  </Button>
                ))}
              </>
            )}
            <IconButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={cart.reduce(
                  (acc, curr) => acc + curr.quantity,
                  0
                )}
                color="error"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <DarkModeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
