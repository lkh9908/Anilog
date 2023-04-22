// import React from 'react'
import Logo from "../img/cat_logo.png";
import { Link } from "react-router-dom";
// export const Navbar = () => {
//   return (
//     <div className='navbar'>
//         <div className='container'>
            // <div className='logo'>
            //     <img class = 'logo' src={Logo} alt="" />
            // </div>
//             <div className='links'>
//                 <Link className='nav-link' to='/'>
//                     <h6>
//                       LALAA
//                     </h6>
//                 </Link>
//                 <Link className='nav-link' to='/'>
//                     <h6>
//                       LALAA
//                     </h6>
//                 </Link>
//                 <Link className='nav-link' to='/'>
//                     <h6>
//                       LALAA
//                     </h6>
//                 </Link>
//                 <span>Peter</span>
//                 <span>Logout</span>
//                 <span className='watch-list'>
                    // <Link to='/watchList'>
                    //     <h6>
                    //     Watch List
                    //     </h6>
                    // </Link>
//                 </span>
//             </div>
//         </div>
//     </div>
//   )
// }

// import { AppBar, Container, Toolbar, Typography } from '@mui/material'
// import { NavLink } from 'react-router-dom';

// // The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// // helper component NavText local to the file is defined to prevent repeated code.
// const NavText = ({ href, text, isMain }) => {
//   return (
//     <Typography
//       variant={isMain ? 'h5' : 'h6'}
//       noWrap
//       style={{
//         marginRight: '0.5rem',
//         fontFamily: 'monospace',
//         fontWeight: 700,
//         letterSpacing: '.1rem',
//       }}
//     >
//       <NavLink
//         to={href}
//         style={{
//           color: 'inherit',
//           textDecoration: 'none',
//         }}
//       >
//         {text}
//       </NavLink>
//     </Typography>
//   )
// }

// // Here, we define the NavBar. Note that we heavily leverage MUI components
// // to make the component look nice. Feel free to try changing the formatting
// // props to how it changes the look of the component.
// export function Navbar() {
//   return (
//     <AppBar position='static'>
//       <Container maxWidth='xm'>
//         <Toolbar disableGutters>
//             <div className='logo'>
//                 <Link to='/'><img className = 'logo' src={Logo} alt=""/></Link>
//             </div>
//             <NavText href='/watchList' text='WatchList' />
//             <NavText href='/userInfo' text='Peter' />
//             <NavText href='/logout' text='Logout' />
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


const pages = ['My List', 'Profile', 'Logout'];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ background: '#9b5de5' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AnimeList
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem key="watchList" onClick={handleCloseNavMenu}>
                    <Link to='/watchList' className = "nav-link">
                      My List
                    </Link>                
                </MenuItem>
                <MenuItem key="userInfo" onClick={handleCloseNavMenu}>
                    <Link to='/userInfo' className = "nav-link">
                      Profile
                    </Link>                
                </MenuItem>
                <MenuItem key="logout" onClick={handleCloseNavMenu}>
                    <Link to='/logout' className = "nav-link">
                      Logout
                    </Link>                
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
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AnimeList
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key="watchList"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to='/watchList' className = "nav-link">
                      <h6>My List</h6>
                </Link>   
              </Button>
              <Button
                key="userInfo"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to='/userInfo' className = "nav-link">
                      <h6>Profile</h6>
                </Link>   
              </Button>
              <Button
                key="logout"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to='/logout' className = "nav-link">
                      <h6>Logout</h6>
                </Link>   
              </Button>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

