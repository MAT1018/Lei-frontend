import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  IconButton,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  navButtons: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mobileMenu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function AppBarComponent({ onMenuClick }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Typography variant="h6" className={classes.title}>
          LEI Merchant Payments
        </Typography>
        
        <div className={classes.navButtons}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/merchants">
            Merchants
          </Button>
          <Button color="inherit" component={Link} to="/payments">
            Payments
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}