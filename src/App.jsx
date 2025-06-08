import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import QRDisplay from './pages/QRDisplay';
import History from './pages/History';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router basename="/NakouPay-app">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/qr" element={<QRDisplay />} />
        <Route path="/history" element={<History />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
