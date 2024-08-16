import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function MenuSimple({ userInfo, login, signup, logout, users = [] }) {
  const [open, setOpen] = React.useState(false);
  const [formType, setFormType] = React.useState('login'); // State to track form type
  const [passwordError, setPasswordError] = React.useState(''); // State to track password error
  const [userNameError, setUserNameError] = React.useState(''); // State to track username error

  const handleClickOpen = (type) => {
    setFormType(type);
    setOpen(true);
    setPasswordError(''); // Clear error when opening form
    setUserNameError(''); // Clear username error when opening form
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (formType === 'signup' && formJson.password !== formJson['confirm-password']) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (formType === 'signup' && users.some(user => user.userName === formJson.userName)) {
      setUserNameError('Username already exists');
      return;
    }

    if (formType === 'login') {
      login(formJson.userName, formJson.password);
    } else if (formType === 'signup') {
      const newUser = {
        id: Date.now(),
        userName: formJson.userName,
        password: formJson.password,
        role: 'customer',
      };
      signup(newUser);
    }
    handleClose();
  };

  return (
    <Dropdown>
      <MenuButton>{userInfo.role === 'none' ? 'Account' : userInfo.userName}</MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        {userInfo.role === 'none' ? (
          <>
            <MenuItem onClick={() => handleClickOpen('login')}>
              Log In
            </MenuItem>
            <MenuItem onClick={() => handleClickOpen('signup')}>Sign up</MenuItem>

            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: handleFormSubmit
              }}
            >
              <DialogTitle>{formType === 'login' ? 'Log In' : 'Sign Up'}</DialogTitle>
              <DialogContent>
                {formType === 'login' ? (
                  <>
                    <DialogContentText>
                      Please enter your email address and password to log in.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="userName"
                      name="userName"
                      label="User Name"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      required
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="standard"
                    />
                  </>
                ) : (
                  <>
                    <DialogContentText>
                      Please enter your details to sign up.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="userName"
                      name="userName"
                      label="User Name"
                      type="text"
                      fullWidth
                      variant="standard"
                      error={!!userNameError}
                      helperText={userNameError}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      required
                      margin="dense"
                      id="confirm-password"
                      name="confirm-password"
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      variant="standard"
                      error={!!passwordError}
                      helperText={passwordError}
                    />
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{formType === 'login' ? 'Log In' : 'Sign Up'}</Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <MenuItem onClick={logout}>Log out</MenuItem>
        )}
      </Menu>
    </Dropdown>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);
