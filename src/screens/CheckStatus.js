import React, { useState, useEffect } from 'react';
import axios from 'axios';
import instance from '../axiosConfig';
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

const ApprovedOutpass = () => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]); // Define setRequests here to manage state

  useEffect(() => {
    fetchApprovedOutpasses(); // Fetch approved outpasses when component mounts
  }, []);

  const fetchApprovedOutpasses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      const response = await instance.get('/outpass/myoutpasses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching approved outpasses:', error);
      // Handle error fetching approved outpasses
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Student Outpasses
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
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default ApprovedOutpass;
