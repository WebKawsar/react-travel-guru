import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Carousel } from 'react-bootstrap';



const HomePage = (props) => {

    const { placeName, img, shortDestails } = props.place;

    return (

            <Carousel.Item>
                <img
                    className="slide-image"
                    src={img}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h1 className="place-name">{placeName}</h1>
                    <p className="place-details">{shortDestails}</p>

                    <button  className="booking-button">Booking <FontAwesomeIcon icon={faArrowRight} /> </button>
                </Carousel.Caption>
            </Carousel.Item>
    );
};

export default HomePage;