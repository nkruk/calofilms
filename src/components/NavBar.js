import React, {Component} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


import * as actions from '../store/actions/index';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden';
import CustomSearchInput from './CustomSearchInput'

class NavBar extends Component {

    state = {
        searchString: '',
    }

    componentDidMount() {
        this.props.onMountAutoSignup();
    }

    filteredTitles(searchString) {
        const filteredArray = []

        this.props.films.map((film) => {
            const filmString = Array(2);
            filmString[0] = `${film.title} ${film.yearOfRelease} ${film.director} ${film.country} ${film.runningTime} ${film.comment}`;
            filmString[1] = film.title;
            return filmString;
            })
            .filter((filmString) => {
            return filmString[0].search(new RegExp(searchString, "i")) !== -1 
            })
            .map((filteredFilm) => {
            return filteredFilm[1];
            })
            .forEach(filteredFilm => {
                this.props.films.forEach(film => {
                    if (filteredFilm === film.title) {
                    filteredArray.push(film);
                }
                });
            });
        return filteredArray;
    }


    onSearchInputChange = (event) => {
        if (event.target.value.trim() !== '') {
            this.setState( {searchString: event.target.value }, () => {
                this.props.updateDisplayedFilms(this.filteredTitles(this.state.searchString));
            });
        } else {
            this.setState({searchString: ''}, () => {
                this.props.updateDisplayedFilms(this.filteredTitles(this.state.searchString));
            } )
        }
    }


    render() {

        return(
            <div>
               
                <AppBar position="fixed" style={{top: 0, backgroundColor: 'black'}}>
                    <Toolbar>
                    <Grid container
                        justify="space-between"
                        alignItems="center">
                    <Grid item>
                    
                    {this.props.displayed ? 
                    <CustomSearchInput search={this.onSearchInputChange} /> 
                    : null}
                    
                    </Grid>
                    <Grid item style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                        <Hidden xsDown>
                            <Typography id="title" variant="title" color="inherit">
                                CaloFilms
                            </Typography>
                        </Hidden>
                    </Grid>
                        { !this.props.isAuthenticated
                            ?   <Grid item>
                                    <NavLink to="/auth">
                                        <Typography variant="title" color="inherit" style={{color:'white'}}>
                                        Ingresar
                                        </Typography>
                                    </NavLink>
                                </Grid> 
                            :   <Grid item>
                                    <NavLink to="/logout">
                                        <Typography variant="title" color="inherit" style={{color:'white', }}>
                                        Cerrar sesión
                                        </Typography>
                                    </NavLink>
                                </Grid>}
                        </Grid>
                    </Toolbar>
                </AppBar>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        films: [...state.films.films],
        displayed: state.films.displayed,
        isAuthenticated: state.auth.token !== null
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        updateDisplayedFilms: (filteredArrayOfFilms) => dispatch(actions.updateFilms(filteredArrayOfFilms)),
        onMountAutoSignup: () => dispatch( actions.authCheckState() ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);