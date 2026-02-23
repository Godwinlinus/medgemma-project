import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Alert } from '@mui/material';
import ChatInterface from './components/ChatInterface';
import PatientInfoForm from './components/PatientInfoForm';
import ConversationList from './components/ConversationList';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Header />

          <Alert
            severity="warning"
            sx={{
              mb: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#856404',
              '& .MuiAlert-icon': {
                color: '#856404',
              },
            }}
          >
            <strong>Medical Disclaimer:</strong> This AI assistant is for educational and informational purposes only.
            Always consult qualified healthcare professionals for medical advice, diagnosis, and treatment.
          </Alert>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', md: 'row' },
              minHeight: '70vh',
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', md: '300px' },
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
                p: 2,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
            >
              <PatientInfoForm />
              <ConversationList />
            </Box>

            <Box
              sx={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ChatInterface />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;