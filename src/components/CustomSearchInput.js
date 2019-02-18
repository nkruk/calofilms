import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';


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
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Tooltip title="Filtrar películas por género, país, título, año de lanzamiento, director@, palabras incluidas en el texto del comentario">
            <SearchIcon/>
          </Tooltip>
        </Grid>
        <Grid item>
          <TextField
            style={{marginLeft: 15, width:80}}
            id="searchInput"
            placeholder="Filtrar films"
            className={classes.root}
            margin="normal"
            InputProps={{
              className: classes.input
            }}
            onChange={props.search}
          />
        </Grid>

      </Grid>
  );
}

CustomSearchInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomSearchInput);