import React, { useEffect, useState } from 'react';
import instance from '../axiosConfig'; // Ensure this import is correct
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';
import { Link } from 'react-router-dom';

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
  requestContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
  },
  requestItem: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: '1px solid #fff',
    borderRadius: '5px',
  },
  requestInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestDetails: {
    color: '#fff',
    marginLeft: theme.spacing(2),
  },
  actionBtn: {
    marginRight: theme.spacing(2),
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

const PendingRequests = () => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      const response = await instance.get('/outpass/pending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
      // Handle error fetching requests
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      await instance.post(`/outpass/handle`, { outpassId: id, status: 'approved' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update requests state after approval
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error approving outpass:', error);
      // Handle error approving outpass
    }
  };

  const handleDecline = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      await instance.post(`/outpass/handle`, { outpassId: id, status: 'rejected' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update requests state after rejection
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error declining outpass:', error);
      // Handle error declining outpass
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Pending Outpass Requests
          </Typography>
          <Button
            component={Link}
            to="/warden/dashboard"
            startIcon={<ExitToAppIcon />}
            className={classes.backButton}
          >
            Back to Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        {requests.map(request => (
          <div key={request._id} className={classes.requestContainer}>
            <div className={classes.requestItem}>
              <div className={classes.requestInfo}>
                <Typography variant="h6">{request.reason}</Typography>
                <Typography variant="body2" className={classes.requestDetails}>
                  Status: {request.status.toUpperCase()}
                </Typography>
              </div>
              <Typography variant="body1" className={classes.requestDetails}>
                <strong>Destination:</strong> {request.destination}
              </Typography>
              <Typography variant="body1" className={classes.requestDetails}>
                <strong>Out Date:</strong> {request.outDate}
              </Typography>
              <Typography variant="body1" className={classes.requestDetails}>
                <strong>Return Date:</strong> {request.returnDate}
              </Typography>
              <div>
                <Button
                  variant="contained"
                  className={classes.actionBtn}
                  onClick={() => handleApprove(request._id)}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  className={classes.actionBtn}
                  onClick={() => handleDecline(request._id)}
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default PendingRequests;
