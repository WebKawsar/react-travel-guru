import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';




const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: "10px",
      float: "left"
    },
    media: {
      height: 140,
    },
    actions: {
        margin: "20px 0"
    },
    content: {
        margin: "15px 0"
    }
  });

const TourPlace = (props) => {

    const { placeName, img, shortDestails } = props.place;

    const classes = useStyles();

    const history = useHistory();
    const handleTourPlace = () => {

        history.push(`/tour/${placeName}`)

    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={img}
                title="Contemplative Reptile"
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {placeName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {shortDestails.slice(0, 180)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                
            <button onClick={handleTourPlace } className="booking-button">Booking <FontAwesomeIcon icon={faArrowRight} /></button>

            </CardActions>
        </Card>
    );
};

export default TourPlace;