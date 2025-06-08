import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Header = ({ title = "Nakou Pay" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("本当にログアウトしますか？");
    if (confirmed) {
      localStorage.removeItem('jwt');
      navigate('/');
    }
  };

  return (
    <AppBar position="fixed" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            ログアウト
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
