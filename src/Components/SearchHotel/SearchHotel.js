import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Header from '../Header/Header';
import Hotel from '../Hotel/Hotel';



const SearchHotel = () => {

    const {place} = useParams();
    const [hotelList, setHotelList] = useState([]);


    useEffect(() => {

        const value = fakeData.filter(hotel => hotel.place === place)
        setHotelList(value);

    }, [])

    console.log(hotelList);

    return (
        <Container>
            <Header></Header>
            {
                hotelList.map(hotelInfo => <Hotel hotelInfo={hotelInfo} key={hotelInfo.id}></Hotel>)
            }
        </Container>
    );
};

export default SearchHotel;