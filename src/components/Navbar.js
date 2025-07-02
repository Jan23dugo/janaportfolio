import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  && {
    background: linear-gradient(135deg, #D71768 0%, #E8458B 50%, #D71768 100%);
    box-shadow: 0 2px 20px rgba(215, 23, 104, 0.15);
    border: none;
    padding: 0.3rem 0;
    
    @media (max-width: 479px) {
      padding: 0.2rem 0;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      padding: 0.25rem 0;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      padding: 0.3rem 0;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      padding: 0.35rem 0;
    }
    @media (min-width: 1200px) {
      padding: 0.4rem 0;
    }
  }
`;

const NavButton = styled(Button)`
  && {
    color: rgba(255, 255, 255, 0.95);
    margin: 0 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    text-transform: none;
    font-family: 'Didact Gothic', sans-serif;
    letter-spacing: 0.3px;
    padding: 0.6rem 1.2rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      color: #D71768;
      background: rgba(255, 255, 255, 0.95);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    @media (max-width: 479px) {
      font-size: 0.85rem;
      padding: 0.4rem 0.8rem;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 0.95rem;
      padding: 0.55rem 1.1rem;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      font-size: 1rem;
      padding: 0.6rem 1.15rem;
    }
    @media (min-width: 1200px) {
      font-size: 1rem;
      padding: 0.6rem 1.2rem;
    }
  }
`;

const Logo = styled.div`
  font-family: 'SAFIRA MARCH', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  overflow: hidden;
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
    transform: scale(1.02);
  }
  
  @media (max-width: 479px) {
    font-size: 0.9rem;
    margin-left: 0.8rem;
    letter-spacing: 0.2px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1rem;
    margin-left: 1rem;
    letter-spacing: 0.3px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 1.2rem;
    letter-spacing: 0.4px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    font-size: 1.3rem;
    letter-spacing: 0.5px;
  }
  @media (min-width: 1200px) {
    font-size: 1.5rem;
    letter-spacing: 0.5px;
  }
`;

const navItems = [
  { name: 'Home', path: '#home' },
  { name: 'About', path: '#about' },
  { name: 'Services', path: '#services' },
  { name: 'Projects', path: '#projects' },
  { name: 'Results', path: '#results' },
  { name: 'Tools', path: '#tools' },
  { name: 'Contact', path: '#contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:991px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar sx={{ 
          minHeight: { xs: '56px', sm: '64px', md: '68px' },
          paddingX: { xs: '1rem', sm: '2rem', md: '3rem', lg: '4rem' }
        }}>
          {isMobile ? (
            <>
              <Logo>Jana Virtuales</Logo>
              <div style={{ marginLeft: 'auto' }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.5rem' }} />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <Logo>Janna Virtuales</Logo>
              <div style={{ 
                marginLeft: 'auto', 
                display: 'flex', 
                alignItems: 'center',
                gap: '0.3rem'
              }}>
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
            </>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
          sx: {
            '& .MuiBackdrop-root': {
              backgroundColor: 'transparent',
            }
          }
        }}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #D71768 0%, #E8458B 100%)',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(215, 23, 104, 0.3)',
            borderRadius: '20px 0 0 20px',
            border: 'none',
            width: '280px',
            height: 'auto',
            maxHeight: '400px',
            top: '64px',
            position: 'absolute',
            overflow: 'hidden',
            '@media (max-width: 479px)': {
              width: '250px',
              top: '56px',
            },
            '@media (min-width: 480px) and (max-width: 767px)': {
              width: '280px',
              top: '64px',
            },
            '@media (min-width: 768px) and (max-width: 991px)': {
              width: '300px',
              top: '68px',
            }
          }
        }}
      >
        <List sx={{ 
          padding: '1rem 0', 
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem'
        }}>
          {navItems.map((item) => (
            <ListItem
              button
              component="a"
              href={item.path}
              key={item.name}
              onClick={handleDrawerToggle}
              sx={{
                margin: '0 1rem',
                padding: '0.8rem 1.2rem',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateX(-5px)',
                }
              }}
            >
              <ListItemText 
                primary={item.name} 
                sx={{ 
                  color: '#fff',
                  '& .MuiTypography-root': {
                    fontFamily: 'Didact Gothic, sans-serif',
                    fontWeight: 500,
                    fontSize: '1rem',
                    letterSpacing: '0.5px',
                  }
                }} 
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Toolbar /> {/* This creates space below the fixed AppBar */}
    </>
  );
};

export default Navbar; 