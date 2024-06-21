import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './DashboardWarden.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    paddingBottom: theme.spacing(4),
  },
  appBar: {
    backgroundColor: '#333',
    marginBottom: theme.spacing(2),
    width: '100%',
    borderRadius: '0',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(4),
    color: '#FFA500',
    textAlign: 'center',
  },
  listContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
  },
  listItem: {
    width: '100%',
    maxWidth: '400px',
    marginBottom: theme.spacing(2),
    backgroundColor: '#333',
    borderRadius: '5px',
    padding: theme.spacing(2),
  },
  listItemText: {
    color: '#fff',
  },
  logoutBtn: {
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
    height: '40px',
    fontSize: '1rem',
    backgroundColor: '#FFA500',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e69500',
    },
  },
}));

const DashboardWarden = () => {
  const classes = useStyles();

  const handleLogout = () => {
    console.log('Logout');
    // Implement logout logic here
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Warden Dashboard
          </Typography>
          <Button
            className={classes.logoutBtn}
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Typography variant="h3" className={classes.header}>
          Welcome, Warden!
        </Typography>
        <div className={classes.listContainer}>
          <List>
            <ListItem
              button
              component={Link}
              to="/warden/pending-requests"
              className={classes.listItem}
            >
              <ListItemText
                primary="Check Pending Requests"
                className={classes.listItemText}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/warden/approved-outpasses"
              className={classes.listItem}
            >
              <ListItemText
                primary="View Approved Outpasses"
                className={classes.listItemText}
              />
            </ListItem>
          </List>
        </div>
      </Container>
    </div>
  );
};

export default DashboardWarden;
