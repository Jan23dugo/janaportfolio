import React from 'react';
import { useAuth } from '../contexts/SimpleAuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{ borderRadius: '20px', ml: 2 }}
    >
      Logout
    </Button>
  );
};

export default Logout; 