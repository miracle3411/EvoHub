import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserProvider';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const pages = ['Home', 'Event Categories', 'Upcoming Events', 'Joined Events'];
const settings = ['Profile', 'Logout'];


function getPagePath(page) {
  switch (page) {
    case 'Home':
      return '/EventUserHome';
    case 'Event Categories':
      return '/UserEventCategory';
    case 'Upcoming Events':
      return '/UserUpcomingEvents';
    case 'Joined Events':
      return '/UserJoinedEvents';
    // Add more cases for additional pages
    default:
      return `/${page.replace(/\s+/g, '-')}`;
  }
}

function getSettingPath(settings) {
  switch (settings) {
    case 'Profile':
      return '/UserProfile';
    // case 'Logout':


    // Add more cases for additional pages
    // default:
    //   return `/${settings.replace(/\s+/g, '-')}`;
  }
}
// const handleLogout = () => {
//   const confirmLogout = window.confirm("Are you sure you want to log out?");
//   if (confirmLogout) {
//     // Perform the logout action and navigate to "/"
//     // For example, you might have a logout function in your UserProvider
//     // that you can call here
//     // user.logout(); 

//     // Redirect to "/"
//     window.location.href = '/';
//   }
// };



function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const { logout, user } = useUser();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Open the logout confirmation modal
    setLogoutModalOpen(true);
      localStorage.removeItem('loginAlertShown');

  };

  const handleCloseLogoutModal = () => {
    // Close the logout confirmation modal
    setLogoutModalOpen(false);
  };

  // React.useEffect(() => {
  //   if (!user) {
  //     setIsDialogOpen(true);
  //   }
  // }, [user]);

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  //   navigate('/');
  // };
  React.useEffect(() => {
    if (!user) {
      navigate('/');
      alert('Already logged out. Please login again!');
    }
  }, [user]);

  return (
    <>
      {!user ? <>(
        {/* <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Please login first</DialogTitle>
        <DialogContent>
          <div style={{display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseDialog} color="primary" sx={{ mt: 2, }}>
            Back to login
          </Button>
          </div>
          
        </DialogContent>
      </Dialog> */}
        )</> : <>
        <AppBar position="fixed" sx={{ background: "white" }}>
          <Container maxWidth="lg">
            <Toolbar >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
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
                <img src="/img/citlogo.png" alt="logo" className='logo' />
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
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}  >
                      <Typography textAlign="center" >{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>


              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Link
                    sx={{ textDecoration: 'none' }}
                    to={getPagePath(page)}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      // Adjust the 'left here'
                      sx={{ my: 2, color: 'black', display: 'flex', left: "0rem", fontSize: 'small', flexDirection: 'row-reverse' }}
                      style={{ textDecoration: 'none' }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))}
              </Box>


              <Box sx={{ flexGrow: 0, marginRight: '4em' }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.fname} src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <Link
                      to={getSettingPath(setting)}
                      style={{ textDecoration: 'none' }}
                    >
                      <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>

              <LogoutConfirmationModal
                open={logoutModalOpen}
                handleClose={() => setLogoutModalOpen(false)}
                
                handleLogout={() => {
                  logout();
                  navigate('/', { replace: true });

                }}
              />
            </Toolbar>
          </Container>
        </AppBar></>}
    </>
  );
}
export default ResponsiveAppBar;