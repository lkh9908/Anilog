// import React from 'react'
import Logo from "../img/cat_logo.png";
import { Link } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "../context/authContext";

const pages = ["My List", "Profile", "Logout"];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { currentUser, logout } = React.useContext(AuthContext);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    const target = e.target;
    // console.log(target.innerText)
    if (target.innerText.toUpperCase() === "LOGOUT") {
      console.log("logging out");
      logout();
    }
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      style={{ background: "#9b5de5", marginBottom: "50px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            AnimeList
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
              <MenuItem key="watchList" onClick={handleCloseNavMenu}>
                {currentUser ? (
                  <Link to="/watchList" className="nav-link">
                    My List
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link">
                    My List
                  </Link>
                )}
              </MenuItem>
              <MenuItem key="userInfo" onClick={handleCloseNavMenu}>
                {currentUser ? (
                  <Link to="/userInfo" className="nav-link">
                    Profile
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link">
                    Profile
                  </Link>
                )}
              </MenuItem>
              <MenuItem key="logout" onClick={handleCloseNavMenu}>
                {currentUser ? (
                  <Link to="/" className="nav-link">
                    Logout
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                )}
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            AnimeList
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="watchList"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {currentUser ? (
                <Link to="/watchList" className="nav-link">
                  <h6>My List</h6>
                </Link>
              ) : (
                <Link to="/login" className="nav-link">
                  <h6>My List</h6>
                </Link>
              )}
            </Button>
            <Button
              key="userInfo"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {currentUser ? (
                <Link to="/userInfo" className="nav-link">
                  <h6>Profile</h6>
                </Link>
              ) : (
                <Link to="/login" className="nav-link">
                  <h6>Profile</h6>
                </Link>
              )}
            </Button>
            {currentUser ? (
              <Button
                key="logout"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/" className="nav-link">
                  <h6>Logout</h6>
                </Link>
              </Button>
            ) : (
              <Button
                key="logout"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to="/login" className="nav-link">
                  <h6>Login</h6>
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
