import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
  header: {
    marginBottom: theme.spacing(4),
    color: '#FFA500',
    textAlign: 'center',
    fontSize: '2rem', // Adjust this value to make the heading smaller
    padding: theme.spacing(2), // Add padding
    margin: theme.spacing(2), // Add margin
    border: '1px solid #FFA500', // Optional: Add a border to enhance the heading
    borderRadius: '5px', // Optional: Add border radius for rounded corners
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
}));

const ApprovedOutpasses = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [outpasses, setOutpasses] = useState([]);

  useEffect(() => {
    fetch('/api/approved-outpasses')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setOutpasses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching approved outpasses:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Typography variant="h4" className={classes.header}>
          Approved Outpasses
        </Typography>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <div className={classes.listContainer}>
            <List>
              {outpasses.map((outpass) => (
                <ListItem key={outpass.outpassId} className={classes.listItem}>
                  <ListItemText
                    primary={`Student: ${outpass.student.name}`}
                    secondary={`Reason: ${outpass.reason}, Destination: ${outpass.destination}, Out Date: ${new Date(outpass.outDate).toLocaleDateString()}, Return Date: ${new Date(outpass.returnDate).toLocaleDateString()}`}
                    className={classes.listItemText}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ApprovedOutpasses;
