import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import fakeData from '../../fakeData';
import Header from '../Header/Header';
import Hotel from '../Hotel/Hotel';

import "./SearchHotel.css";


const SearchHotel = () => {

    const [hotelList, setHotelList] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {

        const filterValue = fakeData.filter(hotel => hotel.place === loggedInUser.bookingData.destination)
        setHotelList(filterValue);

    }, [])

    return (
        <Container>
            <Header></Header>
            <hr/>

                {
                    loggedInUser.bookingData && 
                    <div className="user-info">
                        <br/>
                        <span>{loggedInUser.name} guest at {loggedInUser.bookingData.from} to {loggedInUser.bookingData.to}</span>
                        <h5>Stays in {loggedInUser.bookingData.destination.toUpperCase()} </h5>
                        <p>Available Hotels ({hotelList.length}) are beside in {loggedInUser.bookingData.destination.toUpperCase()}</p>
                    </div>
                }

            
            {
                hotelList.map(hotelInfo => <Hotel hotelInfo={hotelInfo} key={hotelInfo.id}></Hotel>)
            }
        </Container>
    );
};

export default SearchHotel;