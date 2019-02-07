import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import Grid from '@material-ui/core/Grid';
import Film from './Film';
import Spinner from './UI/Spinner/Spinner';

class FilmList extends Component {

    componentDidMount() {
        this.props.onMountFetchFilms();
      }

    render() {

        const displayedFilms = this.props.filteredFilms.map( (currentFilm, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <Film film={currentFilm} />
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
        loading: state.films.loading
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onMountFetchFilms: () => dispatch(actions.fetchFilms()),
    }
  }
  
export default connect( mapStateToProps, mapDispatchToProps)(FilmList);