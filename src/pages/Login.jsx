import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('https://0vkdj662q8.execute-api.ap-northeast-1.amazonaws.com/Test/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, password: password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        // ロールで遷移
        const role = data.role;
        localStorage.setItem('role', role);

        switch (role) {
          case 'user':
          case 'teacher':
          case 'admin':
            navigate('/qr');
            break;
          case 'shop':
            navigate('/shop');
            break;
          case 'charger':
            navigate('/charge');
            break;
          default:
            setMessage('エラー');
        }
      } else {
        setMessage(data.message || 'ログイン失敗');
      }
    } catch (err) {
      setMessage('通信エラー');
    }
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', bgcolor: '#f5f5f5', textAlign: 'center', overflow: 'hidden' }}>
      <Typography variant="h3" sx={{ pt: 12, color: '#333' }}>
        Nakou Pay
      </Typography>

      <Container maxWidth="xs" sx={{ mt: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            maxWidth: '210px',
            mx: 'auto',
            textAlign: 'left',
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 1, color: '#555' }}>
                ユーザーID
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 1, color: '#555' }}>
                パスワード
              </Typography>
              <TextField
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            {message && (
              <Typography color="error" sx={{ mb: 1 }}>
                {message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                bgcolor: '#007bff',
                ':hover': { bgcolor: '#0056b3' },
                fontWeight: 'bold',
                fontSize: '16px',
              }}
            >
              ログイン
            </Button>
          </form>
        </Paper>
      </Container>

      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          textAlign: 'right',
          fontSize: '0.8rem',
          color: '#777',
        }}
      >
        &copy; 2025 奈高ロボット研究部. All rights reserved.
      </Box>
    </Box>
  );
};

export default Login;