import React, { useState, useEffect } from 'react';
import instance from '../axiosConfig'; // Ensure this import is correct
import { jwtDecode } from 'jwt-decode'; // Correct import
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  formField: {
    '& label': {
      color: '#fff',
    },
    '& input': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
  },
  submitButton: {
    backgroundColor: '#FFA500',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#e69500',
    },
  },
}));

const ApplyOutpassForm = () => {
  const classes = useStyles();
  const [outDate, setOutDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [userId, setUserId] = useState('');

  // Get today's date for comparison
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Retrieve and decode the token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {

      const response = await instance.post('/outpass/request', {
        userId, // Add userId to the request body
        outDate,
        returnDate,
        reason,
        destination,
      });

      console.log('Outpass requested successfully:', response.data);
      setSubmitSuccess(true); // Set state for success message
      setSubmitError(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error requesting outpass:', error);
      setSubmitError('Failed to submit outpass request. Please try again.'); // Set state for error message
      setSubmitSuccess(false); // Clear any previous success messages
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Apply for Outpass
          </Typography>
          <Button
            component={Link}
            to="/student/dashboard"
            startIcon={<ExitToAppIcon />}
            className={classes.backButton}
          >
            Back to Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <div className={classes.formContainer}>
          <Typography variant="h5" style={{ marginBottom: '16px', color: '#fff' }}>
            Fill Out the Outpass Request Form
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} method="POST">
            <TextField
              className={classes.formField}
              label="Out Date"
              type="date"
              value={outDate}
              onChange={(e) => setOutDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ min: today }} // Set min attribute to today's date
              required
            />
            <TextField
              className={classes.formField}
              label="Return Date"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ min: outDate }} // Set min attribute to selected outDate
              required
            />
            <TextField
              className={classes.formField}
              label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
            <TextField
              className={classes.formField}
              label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.submitButton}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </Button>
            {submitSuccess && (
              <Typography variant="body1" style={{ color: 'green', marginTop: '10px' }}>
                Outpass requested successfully!
              </Typography>
            )}
            {submitError && (
              <Typography variant="body1" style={{ color: 'red', marginTop: '10px' }}>
                {submitError}
              </Typography>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ApplyOutpassForm;
