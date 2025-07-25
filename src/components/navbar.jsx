// -------------------- Navbar.jsx --------------------
import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Button, Box, InputBase, IconButton, Menu, MenuItem, Badge,
  Typography, Drawer, List, ListItem, ListItemText, Divider, Avatar
} from '@mui/material';
import {
  Search as SearchIcon, ShoppingCart as ShoppingCartIcon, Person as PersonIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon, Menu as MenuIcon, Close as CloseIcon
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { useCart } from '../context/CartContext';
import logo from '../assets/images/logo.png';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: '1px solid #ddd',
  display: 'flex',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#b37c42',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    '&::placeholder': {
      color: '#b37c42',
      opacity: 0.7,
    },
  },
}));

const Logo = styled('img')({
  height: '50px',
  marginRight: '10px',
  cursor: 'pointer',
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#b37c42',
    color: 'white',
  },
}));

const Navbar = () => {
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleCategoryMenuOpen = (event) => setCategoryMenuAnchor(event.currentTarget);
  const handleCategoryMenuClose = () => setCategoryMenuAnchor(null);
  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleProfileMenuOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/signin');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
  };

  const handleCartClick = () => navigate('/cart');

  const navItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/aboutus' },
    { label: 'Products', link: '/products' },
    { label: 'Contact', link: '/contactus' }
  ];

  const categories = [
    'Skin Care', 'Hair Care', 'Makeup', 'Perfumes', 'Body Care', 'Men Grooming'
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#f5efe6', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton color="inherit" edge="start" onClick={handleMobileMenuToggle} sx={{ display: { sm: 'none' }, color: '#b37c42' }}>
            <MenuIcon />
          </IconButton>

          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Logo src={logo} alt="Logo" />
            <Typography variant="h6" sx={{ color: '#b37c42', fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>THOORI</Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', mx: 2 }}>
            <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '500px' }}>
              <SearchContainer>
                <StyledInputBase
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <IconButton type="submit" sx={{ p: '10px', bgcolor: '#b37c42', color: 'white', borderRadius: '0 4px 4px 0' }}>
                  <SearchIcon />
                </IconButton>
              </SearchContainer>
            </form>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button key={item.label} component={Link} to={item.link} sx={{ color: '#b37c42', mx: 1, fontWeight: 'bold' }}>{item.label}</Button>
            ))}

            <Button sx={{ color: '#b37c42' }} endIcon={<KeyboardArrowDownIcon />} onClick={handleCategoryMenuOpen}>
              Categories
            </Button>

            <IconButton onClick={handleCartClick} sx={{ color: '#b37c42' }}>
              <StyledBadge badgeContent={getCartCount()}><ShoppingCartIcon /></StyledBadge>
            </IconButton>

            {user ? (
              <>
                <IconButton onClick={handleProfileMenuOpen} sx={{ color: '#b37c42' }}>
                  <Avatar sx={{ bgcolor: '#b37c42', width: 30, height: 30 }}>
                    {user.firstName?.[0]}
                  </Avatar>
                </IconButton>
                <Menu anchorEl={profileAnchorEl} open={Boolean(profileAnchorEl)} onClose={handleProfileMenuClose}>
                  <MenuItem disabled>{user.firstName} {user.lastName}</MenuItem>
                  {user.role === 'admin' ? (
                    <>
                      <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/admin'); }}>Dashboard</MenuItem>
                      <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/productmanagement'); }}>Product Management</MenuItem>
                      <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/userlist'); }}>User list</MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>My Profile</MenuItem>
                      <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/orders'); }}>My Orders</MenuItem>
                    </>
                  )}
                  <MenuItem onClick={() => { handleProfileMenuClose(); handleLogout(); }}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton component={Link} to="/signin" sx={{ color: '#b37c42' }}><PersonIcon /></IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={categoryMenuAnchor} open={Boolean(categoryMenuAnchor)} onClose={handleCategoryMenuClose}>
        {categories.map((category) => (
          <MenuItem key={category} onClick={handleCategoryMenuClose}>{category}</MenuItem>
        ))}
      </Menu>

      <Drawer anchor="left" open={mobileMenuOpen} onClose={handleMobileMenuToggle}>
        <Box sx={{ p: 2, width: 280 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: '#b37c42' }}>Menu</Typography>
            <IconButton onClick={handleMobileMenuToggle}><CloseIcon sx={{ color: '#b37c42' }} /></IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} component={Link} to={item.link} onClick={handleMobileMenuToggle}>
                <ListItemText primary={item.label} sx={{ color: '#b37c42' }} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ color: '#b37c42', mb: 1 }}>Categories</Typography>
          <List>
            {categories.map((category) => (
              <ListItem button key={category} onClick={handleMobileMenuToggle}>
                <ListItemText primary={category} sx={{ color: '#b37c42' }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Toolbar />
    </>
  );
};

export default Navbar;
