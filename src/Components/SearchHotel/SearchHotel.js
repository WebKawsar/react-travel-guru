import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import fakeData from '../../fakeData';
import Header from '../Header/Header';
import Hotel from '../Hotel/Hotel';

import "./SearchHotel.css";


const SearchHotel = () => {

    const {place} = useParams();
    const [hotelList, setHotelList] = useState([]);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);



    useEffect(() => {

        const filterValue = fakeData.filter(hotel => hotel.place === place)
        setHotelList(filterValue);

    }, [])



    console.log(" loggedInUser",loggedInUser);

    console.log(" hotelList",hotelList);



    return (
        <Container>
            <Header></Header>
            <hr/>

                {
                    loggedInUser.data && 
                    <div className="user-info">
                        <br/>
                        <span>{loggedInUser.name} guest at {loggedInUser.data.from} to {loggedInUser.data.to}</span>
                        <h5>Stays in {loggedInUser.data.destination.toUpperCase()} </h5>
                        <p>Available Hotels ({hotelList.length}) are beside in {loggedInUser.data.destination.toUpperCase()}</p>
                    </div>
                }

            
            {
                hotelList.map(hotelInfo => <Hotel hotelInfo={hotelInfo} key={hotelInfo.id}></Hotel>)
            }
        </Container>
    );
};

export default SearchHotel;