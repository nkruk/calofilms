import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'black',
    "&:disabled": {
      backgroundColor: 'grey'
    },
    '&:hover': {
      backgroundColor: 'white',
      color: 'black'
    }
  },
  
  
});

function ContainedButton(props) {
  const { classes } = props;
  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        className={classes.button}
        type="submit"
        disabled={props.disabled}
        onClick={props.clicked}>
        {props.children}
      </Button>
    </div>
  );
}

ContainedButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButton);