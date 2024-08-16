import React from 'react';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import DropDown from './dropDown'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
// import { Link } from 'react-router-dom';
Header.propTypes = {

};

function Header({ user, login, signup, logout }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div style={{ marginBottom: "30px" }}>
      <h1 className='App-header'>Figure Shop</h1>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton>
              <a href="/" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}><HomeIcon sx={{ color: 'white' }} /></a>
            </IconButton>
            {user.role === 'customer' && (
              <IconButton sx={{ marginLeft: '20px' }}>
                <a href="/cart" onClick={(e) => { e.preventDefault(); handleNavigation('/cart'); }} ><ShoppingCartIcon sx={{ color: 'white' }} /></a>
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <DropDown userInfo={user} login={login} logout={logout} signup={signup} />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;