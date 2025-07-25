import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Person, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  Login as LoginIcon,
  AdminPanelSettings 
} from '@mui/icons-material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const LoginContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled(Paper)`
  && {
    padding: 3rem;
    border-radius: 16px;
    box-shadow: 0 10px 25px 0 rgb(0 0 0 / 0.1);
    max-width: 400px;
    width: 100%;
    background: white;
  }
`;

const LogoSection = styled(Box)`
  text-align: center;
  margin-bottom: 2rem;
`;

const AdminIcon = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #D71768, #e91e63);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 12px 0 rgb(215 23 104 / 0.3);
`;

const Title = styled(Typography)`
  && {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
`;

const Subtitle = styled(Typography)`
  && {
    color: #64748b;
    font-size: 0.875rem;
  }
`;

const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 12px;
      transition: all 0.2s;
      
      &:hover .MuiOutlinedInput-notchedOutline {
        border-color: #D71768;
      }
      
      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: #D71768;
        box-shadow: 0 0 0 3px rgb(215 23 104 / 0.1);
      }
    }
    
    .MuiInputLabel-root.Mui-focused {
      color: #D71768;
    }
  }
`;

const LoginButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #D71768, #e91e63);
    color: white;
    text-transform: none;
    border-radius: 12px;
    padding: 0.875rem 2rem;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.2s;
    box-shadow: 0 4px 12px 0 rgb(215 23 104 / 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px 0 rgb(215 23 104 / 0.4);
    }
    
    &:disabled {
      background: #94a3b8;
      transform: none;
      box-shadow: none;
    }
  }
`;

const SimpleLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    setLocalError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setLocalError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.username,
        password: formData.password,
      });

      console.log('Supabase login result:', { data, error });

      if (error) {
        setLocalError(error.message);
      } else if (data && data.user) {
        navigate('/admin');
      } else {
        setLocalError('Login failed: No user returned.');
      }
    } catch (error) {
      setLocalError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginCard elevation={0}>
        <LogoSection>
          <AdminIcon>
            <AdminPanelSettings sx={{ fontSize: 40, color: 'white' }} />
          </AdminIcon>
          <Title>Admin Login</Title>
          <Subtitle>Access your portfolio dashboard</Subtitle>
        </LogoSection>

        {localError && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {localError}
          </Alert>
        )}

        <FormContainer onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            value={formData.username}
            onChange={handleInputChange('username')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: '#64748b' }} />
                </InputAdornment>
              ),
            }}
            placeholder="Enter your email"
            disabled={loading}
            autoComplete="username"
          />

          <StyledTextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange('password')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#64748b' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Enter your password"
            disabled={loading}
            autoComplete="current-password"
          />

          <LoginButton
            type="submit"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
          >
            {loading ? 'Signing In...' : 'Access Dashboard'}
          </LoginButton>
        </FormContainer>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="textSecondary">
            Contact the system administrator if you need access
          </Typography>
        </Box>
      </LoginCard>
    </LoginContainer>
  );
};

export default SimpleLogin; 