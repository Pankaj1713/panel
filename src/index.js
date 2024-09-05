// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes/Routes';
import { CssBaseline } from '@mui/material';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <AppRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);
