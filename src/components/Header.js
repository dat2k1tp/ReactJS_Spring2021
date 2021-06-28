import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';



import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import Product from './products/Product';
import Category from './category/Category';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import DoiMatKhau from './custom/DoiMatKhau';
import ThungRac from './TinhNang/ThungRac';
import Home from './custom/Home';
import GioHang from './TinhNang/GioHang';
import ThungRacCate from './TinhNang/ThungRacCate';
function Header({ setCheckLogin,formLogin,account,setAccount}) {
  //set up AppBar
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const classes = useStyles();
 
  //set up menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //logout
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleMenu = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const open = Boolean(anchorEl1);

  const handleOut = () => {
    setAnchorEl1(null);
    setCheckLogin(false);

  }
  //gio hang 
  const[cart,setCart]=useState([])

  return (
    <div className={classes.root}>

      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>

            <Button aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary" onClick={handleClick}>
              Menu
             </Button>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  className="nav-link"
                  to="/home" >
                  Home
                  </Link>
              </MenuItem>
              
              <MenuItem onClick={handleClose}>
                <Link
                  className="nav-link"
                  to="/categories" >
                  Category
                  </Link>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Link
                  className="nav-link"
                  to="/products">
                  Product
                </Link>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Link
                  className="nav-link"
                  to="/restore">
                    Restore Categories
                </Link>
                 
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Link
                  className="nav-link"
                  to="/restore/product">
                   Restore Products
                </Link>
                 
              </MenuItem>
            </Menu>

            <Typography className={classes.title} variant="h6" noWrap>

            </Typography>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl1}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose1}
            >
               <MenuItem onClick={handleClose1}>
                 <Link
                    className="nav-link"
                    to="/cart">
                       Giỏ hàng
                  </Link>
              </MenuItem>
              
              <MenuItem onClick={handleClose1}>
                  <Link
                    className="nav-link"
                    to="/account">
                    Tài khoản
                  </Link>
              </MenuItem>

              <MenuItem onClick={handleOut}>
                 <a className="nav-link" href="http://localhost:3000/" >
                   Logout
                 </a>
              </MenuItem>
             

            </Menu>

          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/products">
            <Product />
          </Route>
          <Route path="/categories">
            <Category />
          </Route>
          <Route path="/home">
            <Home cart={cart} setCart={setCart}/>
          </Route>
          <Route path="/cart">
            <GioHang cart={cart} setCart={setCart}/>
          </Route>
          <Route path="/account">
            <DoiMatKhau formLogin={formLogin} account={account}
             setAccount={setAccount}  setCheckLogin={setCheckLogin}/>
          </Route>
          <Route exact path="/restore/product">
            <ThungRac/>
          </Route>
          <Route exact path="/restore">
            <ThungRacCate/>
          </Route>
        </Switch>

      </BrowserRouter>
    </div>
  );
}
export default Header