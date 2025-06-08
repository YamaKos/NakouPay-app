import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import QrCodeIcon from '@mui/icons-material/QrCode';
import HistoryIcon from '@mui/icons-material/History';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RefundIcon from '@mui/icons-material/Undo';
import ShopIcon from '@mui/icons-material/Store';

const BottomNav = ({ }) => {
  const role = localStorage.getItem('role')
  const navigate = useNavigate();
  const location = useLocation();

  const getActions = () => {
    switch (role) {
      case 'user':
        return [
          { label: 'QR表示', icon: <QrCodeIcon />, path: '/qr' },
          { label: '履歴', icon: <HistoryIcon />, path: '/history' },
        ];
      case 'teacher':
        return [
          { label: 'QR表示', icon: <QrCodeIcon />, path: '/qr' },
          { label: '履歴', icon: <HistoryIcon />, path: '/history' },
          { label: '返金', icon: <RefundIcon />, path: '/refund' },
        ];
      case 'admin':
        return [
          { label: 'QR表示', icon: <QrCodeIcon />, path: '/qr' },
          { label: '履歴', icon: <HistoryIcon />, path: '/history' },
          { label: '返金', icon: <RefundIcon />, path: '/refund' },
          { label: '全体売上', icon: <AdminPanelSettingsIcon />, path: '/sales' },
          { label: '残高変更', icon: <MonetizationOnIcon />, path: '/adjust' },
        ];
      case 'shop':
        return [
          { label: '読み取り', icon: <QrCodeIcon />, path: '/read' },
          { label: '履歴', icon: <HistoryIcon />, path: '/history' },
          { label: '売上', icon: <ShopIcon />, path: '/sales' },
        ];
      case 'charger':
        return [
          { label: '読み取り', icon: <QrCodeIcon />, path: '/read' },
        ];
      default:
        return [];
    }
  };

  const actions = getActions();
  const currentIndex = actions.findIndex(action => action.path === location.pathname);

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={currentIndex}
        onChange={(event, newValue) => {
          navigate(actions[newValue].path);
        }}
      >
        {actions.map((action, index) => (
          <BottomNavigationAction
            key={index}
            label={action.label}
            icon={action.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
