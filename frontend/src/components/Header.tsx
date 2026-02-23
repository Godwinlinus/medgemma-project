import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        color: 'primary.main',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
        mb: 2,
      }}
    >
      <Toolbar>
        <LocalHospitalIcon sx={{ mr: 2, fontSize: '2rem' }} />
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          MedGemma - Medical AI Assistant
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Powered by Google's MedGemma
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;