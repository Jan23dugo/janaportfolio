import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  && {
  background-color: #D71768;
  backdrop-filter: blur(10px);
  box-shadow: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const NavButton = styled(Button)`
  && {
  color: #fff;
  margin: 0 1rem;
  font-size: 0.9rem;
  text-transform: none;
  transition: color 0.2s, border-bottom 0.2s;
  border-bottom: 2px solid transparent;
  &:hover {
    color: #F7B6CF;
    background: transparent;
    border-bottom: 2px solid #F7B6CF;
  }
}
`;

const navItems = [
  { name: 'Home', path: '#home' },
  { name: 'About', path: '#about' },
  { name: 'Services', path: '#services' },
  { name: 'Projects', path: '#projects' },
  { name: 'Results', path: '#results' },
  { name: 'Contact', path: '#contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:720px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ color: '#F7B6CF' }} />
            </IconButton>
          ) : (
            <div style={{ marginLeft: 'auto' }}>
              {navItems.map((item) => (
                <NavButton
                  key={item.name}
                  component="a"
                  href={item.path}
                >
                  {item.name}
                </NavButton>
              ))}
            </div>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#D71768',
            color: '#fff',
          }
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              component="a"
              href={item.path}
              key={item.name}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item.name} sx={{ color: '#fff' }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Toolbar /> {/* This creates space below the fixed AppBar */}
    </>
  );
};

export default Navbar; 