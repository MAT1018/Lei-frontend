import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  CssBaseline, 
  Container, 
  ThemeProvider, 
  createTheme, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText 
} from '@material-ui/core';
import HomePage from './pages/HomePage';
import MerchantPage from './pages/MerchantPage';
import PaymentPage from './pages/PaymentPage';
import AppBar from './components/AppBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/" 
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/merchants" 
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Merchants" />
        </ListItem>
        <ListItem 
          button 
          component={Link} 
          to="/payments" 
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Payments" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar onMenuClick={handleDrawerToggle} />
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/merchants" element={<MerchantPage />} />
            <Route path="/payments" element={<PaymentPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;