import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Header/Header';
import "./Home.css";
import fakePlace from '../../fakeData/fakePlace';
import TourPlace from '../TourPlace/TourPlace';



const Home = () => {

    const [places, setPlaces] = useState(fakePlace)

    return (
        <div className="home-section">
            <Container>
                <Header></Header>
                <div className="home-page">
                    <div className="row">
                        <div className="col-md-12">

                            {

                                places.map(place => <TourPlace key={place.id} place={place}></TourPlace>)
                            }

                        </div>
                    </div>
                </div>
            </Container>
        </div>

    );
};

export default Home;


