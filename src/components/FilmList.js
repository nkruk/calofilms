import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import Grid from '@material-ui/core/Grid';
import Film from './Film';
import Spinner from './UI/Spinner/Spinner';

class FilmList extends Component {


    componentDidMount() {
        this.props.onMountFetchFilms();
        this.props.toggleInAuth(false);
        setTimeout( () => { 
            if (this.props.isAuthenticated) {
                this.props.onMountFetchFilmsInUsersQueue(this.props.token, this.props.userId);
                }
        }, 0);
        
        
    }

    addToQueueHandler(event, filmTitle) {
        const userIdAndFilmTitle = {
            userId: this.props.userId,
            film: filmTitle
        };
        this.props.dispatchAddToUserQueue(userIdAndFilmTitle, this.props.token );
    }

    removeFromQueueHandler(event, filmTitle) {
        const docIdToRemove = this.props.filmsInUsersQueue.find(element => element.film === filmTitle).docID;
        this.props.dispatchRemoveFromUserQueue(docIdToRemove, filmTitle, this.props.token, this.props.userId );
    }


    render() {

        if (this.props.onlyShowQueue === true && this.props.filmsInUsersQueue.length === 0) {
            this.props.toggleOnlyShowQueue();
        }

        let displayedFilms;
        if (!this.props.onlyShowQueue) {
        displayedFilms = this.props.filteredFilms        
        .map( (currentFilm, index) => {
            return (
            <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <Film film={currentFilm} 
                isAuth={this.props.isAuthenticated} 
                // isInUsersQueue={titlesQueue.includes(currentFilm.title)} 
                isInUsersQueue={this.props.filmsInUsersQueue
                                        .filter((element) => element.film === currentFilm.title)
                                        .length > 0 ? true : false} 
                addToQueue={(event) => this.addToQueueHandler (event, currentFilm.title)}
                removeFromQueue={(event) => this.removeFromQueueHandler (event, currentFilm.title)} />
            </Grid>
        )})
        } else {
            const titlesArray = this.props.filmsInUsersQueue.reduce((array, element) => { 
                array.push(element.film)
                return array;
            }, []);

            displayedFilms = this.props.films.filter((element) => {
                return titlesArray.includes(element.title)
                })
                .map((currentFilm, index) => {
                return (
                    <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                        <Film film={currentFilm}
                        isAuth={this.props.isAuthenticated} 
                        // isInUsersQueue={titlesQueue.includes(currentFilm.title)} 
                        isInUsersQueue={true} 
                        addToQueue={(event) => this.addToQueueHandler (event, currentFilm.title)}
                        removeFromQueue={(event) => this.removeFromQueueHandler (event, currentFilm.title)} />
                </Grid>
                )
            }) 
        }

        return (
            
            <>
                {
                this.props.loading ? 
                    <Spinner /> : 
                        (
                            <Grid container spacing={24} 
                            style={{padding: 24, marginTop: '45px'}}>
                                {displayedFilms}
                            </Grid>
                        )
                }  
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        films: [...state.films.films],
        filteredFilms: [...state.films.displayedFilms],
        loading: state.films.loading,
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId,
        token: state.auth.token,
        filmsInUsersQueue: state.userLists.filmsInUsersQueue,
        onlyShowQueue: state.userLists.onlyShowQueue,
        inAuth: state.auth.inAuth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMountFetchFilms: () => dispatch(actions.fetchFilms()),
        onMountFetchFilmsInUsersQueue: (token, userId) => dispatch(actions.fetchUsersQueue(token, userId)),
        dispatchAddToUserQueue: (addToQueueData, token) => dispatch(actions.addToUserQueue(addToQueueData, token)),
        dispatchRemoveFromUserQueue: (removeFromQueueData, film, token, userId) => dispatch(actions.removeFromUserQueue(removeFromQueueData, film, token, userId)),
        toggleInAuth: (boolean) => dispatch(actions.toggleInAuth(boolean)),
        toggleOnlyShowQueue: () => dispatch(actions.toggleOnlyShowQueue())

    }
}

export default connect( mapStateToProps, mapDispatchToProps)(FilmList);