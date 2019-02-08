import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    background: "black"
  },
  input: {
    color: "white"
  }
};

function CustomSearchInput(props) {
  const { classes } = props;

  return (
    <TextField
      style={{marginLeft: 15}}
      id="searchInput"
      placeholder="Filtrar films"
      className={classes.root}
      margin="normal"
      InputProps={{
        className: classes.input
      }}
      onChange={props.search}
    />
  );
}

CustomSearchInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomSearchInput);