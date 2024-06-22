import React, { useState, useEffect } from 'react';
import instance from '../axiosConfig'; // Ensure this import is correct
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  backButton: {
    marginLeft: 'auto',
    color: '#fff',
  },
  formContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
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
}));

const CheckStatus = () => {
  const classes = useStyles();
  const [status, setStatus] = useState('pending'); // Default to pending
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }

        const response = await instance.get('/outpass/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Adjust endpoint if necessary

        // Assuming backend response is { status: 'pending' } or { status: 'approved' }
        setStatus(response.data.status || 'pending');
      } catch (error) {
        console.error('Error fetching outpass status:', error);
        setError('Failed to fetch status. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleCheckStatus = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      const response = await instance.get('/outpass/status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Adjust endpoint if necessary

      // Assuming backend response is { status: 'pending' } or { status: 'approved' }
      setStatus(response.data.status || 'pending');
    } catch (error) {
      console.error('Error fetching outpass status:', error);
      setError('Failed to fetch status. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <div className={classes.formContainer}>
          <Typography variant="h5" style={{ marginBottom: '16px', color: '#fff' }}>
            Outpass Status
          </Typography>
          <div className={classes.statusContainer}>
            {loading ? (
              <CircularProgress style={{ color: '#FFA500' }} />
            ) : error ? (
              <Typography variant="body1" className={classes.statusText} style={{ color: 'red' }}>
                {error}
              </Typography>
            ) : (
              <>
                <Typography variant="body1" className={classes.statusText}>
                  Current Status: {status.toUpperCase()}
                </Typography>
                <Button
                  variant="contained"
                  className={classes.statusBtn}
                  onClick={handleCheckStatus}
                >
                  {loading ? 'Refreshing...' : 'Refresh Status'}
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckStatus;


