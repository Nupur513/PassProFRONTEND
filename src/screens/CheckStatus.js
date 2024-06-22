import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';
import { Link } from 'react-router-dom';
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
  statusContainer: {
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
  statusText: {
    color: '#fff',
    marginBottom: theme.spacing(2),
  },
  statusBtn: {
    backgroundColor: '#FFA500',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#e69500',
    },
  },
  backButton: {
    backgroundColor: '#FFA500', // Orange background color
    color: '#fff',
    '&:hover': {
      backgroundColor: '#e69500', // Darker shade of orange on hover
    },
  },
}));

const CheckStatus = () => {
  const classes = useStyles();
  const [status, setStatus] = useState('pending'); // Mocking status, replace with actual status logic

  const handleCheckStatus = () => {
    // Implement logic to fetch and update status
    // For now, mock the status update
    setStatus('approved'); // Can be 'pending', 'approved', 'rejected', etc.
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Check Outpass Status
          </Typography>
          <Button
            component={Link}
            to="/student/dashboard"
            startIcon={<ExitToAppIcon />}
            className={classes.backButton} // Apply custom styling here
          >
            Back to Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <div className={classes.statusContainer}>
          <Typography variant="h5" className={classes.header}>
            Your Outpass Status
          </Typography>
          <Typography variant="body1" className={classes.statusText}>
            Current Status: {status.toUpperCase()}
          </Typography>
          <Button
            variant="contained"
            className={classes.statusBtn}
            onClick={handleCheckStatus}
          >
            Refresh Status
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CheckStatus;
