import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import Grid from '@material-ui/core/Grid';
import Film from './Film';
import Spinner from './UI/Spinner/Spinner';

class FilmList extends Component {

    componentDidMount() {
        this.props.onMountFetchFilms();
        if (this.props.isAuthenticated) {
        this.props.onMountFetchFilmsInUsersQueue(this.props.token, this.props.userId);
        }
    }

    addToQueueHandler(event, filmTitle) {
        const userIdAndFilmTitle = {
            userId: this.props.userId,
            film: filmTitle
        };
        this.props.dispatchAddToUserQueue(userIdAndFilmTitle, this.props.token );
    }

    removeFromQueueHandler(event, filmTitle) {
        const userIdAndFilmTitle = {
            userId: this.props.userId,
            film: filmTitle
        };
        this.props.dispatchRemoveFromUserQueue(userIdAndFilmTitle, this.props.token );
    }


    render() {

        console.log(this.props.filmsInUsersQueue);

        const displayedFilms = this.props.filteredFilms.map( (currentFilm, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <Film film={currentFilm} 
                isAuth={this.props.isAuthenticated} 
                isInUsersQueue={this.props.filmsInUsersQueue.includes(currentFilm.title)}
                addToQueue={(event) => this.addToQueueHandler (event, currentFilm.title)}
                removeFromQueue={(event) => this.removeFromQueueHandler (event, currentFilm.title)} />
            </Grid>
        ))

        return (
            <>
                {
                this.props.loading ? 
                    <Spinner /> : 
                        (
                            <Grid container spacing={24} 
                            style={{padding: 24, marginTop: '80px'}}>
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
        filmsInUsersQueue: state.userLists.filmsInUsersQueue
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMountFetchFilms: () => dispatch(actions.fetchFilms()),
        onMountFetchFilmsInUsersQueue: (token, userId) => dispatch(actions.fetchUsersQueue(token, userId)),
        dispatchAddToUserQueue: (addToQueueData, token) => dispatch(actions.addToUserQueue(addToQueueData, token)),
        dispatchRemoveFromUserQueue: (removeFromQueueData, token) => dispatch(actions.removeFromUserQueue(removeFromQueueData, token)),

    }
}

export default connect( mapStateToProps, mapDispatchToProps)(FilmList);