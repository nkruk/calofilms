import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import AddToQueue from '@material-ui/icons/AddToQueue';
import RemoveFromQueue from '@material-ui/icons/RemoveFromQueue';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';



const Film = (props) => {

    const subheader = `${props.film.yearOfRelease} - ${props.film.country} - ${props.film.runningTime} minutos`

    return(
        <div>
          { props.film ? (
                <Card>
                    <CardMedia style={{height: 500, paddingTop: '56.25%'}}
                        image={props.film.poster}
                        title={props.film.title}
                        />
                    <CardContent>
                        <Typography variant="title" gutterBottom={true}>{props.film.title}</Typography>
                        <Typography variant="subtitle2" gutterBottom={true}>{subheader}</Typography>
                        <Typography variant="overline" gutterBottom={true} noWrap={true}>Dirección: {props.film.director}</Typography>
                        <Typography style={{fontSize: '1rem'}} variant="body1" align="justify" component="p">
                            {props.film.comment}
                        </Typography>
                    
                    </CardContent>
                    <CardActions>
                    <Grid container 
                          alignItems="center"
                          justify="space-between">
                    <Grid item>
                        <Button size="small" color="primary" href={props.film.trailer} target="_blank">
                           Ver trailer
                        </Button> 
                        </Grid>
                        {
                            props.isAuth && !props.isInUsersQueue ?
                            (   
                                <Grid item>
                                <Tooltip title="Añadir a tu lista personal">
                                <IconButton aria-label="Añadir a favoritos" onClick={props.addToQueue}>
                                    <AddToQueue />
                                </IconButton>
                                </Tooltip>
                                </Grid>
                            ) : null
                        }

{
                            props.isAuth && props.isInUsersQueue ?
                            (   <Tooltip title="Quitar de tu lista personal">
                                <IconButton aria-label="Añadir a favoritos" onClick={props.removeFromQueue}>
                                    <RemoveFromQueue />
                                </IconButton>
                                </Tooltip>
                            ) : null
                        }
                        </Grid>
                    </CardActions>
                </Card>
          ): null }  
        </div>
    )
}
export default Film