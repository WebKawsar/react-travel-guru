import React, { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import Header from '../Header/Header';
import "./Home.css";

import slide1 from "../../travel-guru-resources/Image/place-conxsbazar.jpg";
import slide2 from "../../travel-guru-resources/Image/place-sundarban.jpg";
import slide3 from "../../travel-guru-resources/Image/place-sreemangal.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';


const Home = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const history = useHistory();
    const handleBookingButton = (name) => {
        
        if(name === "sreemangal"){
            history.push("/tour/sreemangal");
        }

        if(name === "coxsbazar"){
            history.push("/tour/coxsbazar");
        }

        if(name === "sundarbans"){
            history.push("/tour/sundarbans");
        }





    }



    return (
        <div className="home-section">
            <Container>
                <Header></Header>
                <div className="home-page">
                    <div className="row">
                        <div className="col-md-12">
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                                <Carousel.Item>
                                    <img
                                        className="slide-image"
                                        src={slide1}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h1 className="place-name">COX'S BAZAR</h1>
                                        <p className="place-details">The modern Cox's Bazar derives its name from Captain Hiram Cox, an officer of the British East India Company</p>

                                        <button onClick={() => handleBookingButton("coxsbazar")} className="booking-button">Booking <FontAwesomeIcon icon={faArrowRight} /> </button>
                                    </Carousel.Caption>
                                </Carousel.Item> 

                                <Carousel.Item>
                                    <img
                                        className="slide-image"
                                        src={slide2}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h1 className="place-name">SUNDARSBAN</h1>
                                        <p className="place-details">The Sundarbans is a mangrove area in the delta formed by the confluence of the Ganges the Bay of Bengal. </p>

                                        <button onClick={() => handleBookingButton("sundarbans")} className="booking-button">Booking <FontAwesomeIcon icon={faArrowRight} /> </button>
                                    </Carousel.Caption>
                                </Carousel.Item> 
                                <Carousel.Item>
                                    <img
                                        className="slide-image"
                                        src={slide3}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h1 className="place-name">SREEMANGAL</h1>
                                        <p className="place-details">It is said the name Sreemangal (or Srimangal) is named after Sri Das and Mangal Das; two brothers who settled.</p>

                                        <button onClick={() => handleBookingButton("sreemangal")} className="booking-button">Booking <FontAwesomeIcon icon={faArrowRight} /> </button>
                                    </Carousel.Caption>
                                </Carousel.Item>




                                {/* {
                                    places.map(place => <HomePage place={place} key={place.id}></HomePage>)
                                } */}

                            </Carousel>
                        </div>
                    </div>
                </div>
            </Container>
        </div>

    );
};

export default Home;


