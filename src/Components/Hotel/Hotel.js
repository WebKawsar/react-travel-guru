import React from 'react';
import "./Hotel.css";



const Hotel = (props) => {

    const {hotelName, description, imgUrl, bed, capacity, bedroom, baths, halfprice, totalPrice, ratings, ratingsPerson, starImg, place} = props.hotelInfo;

    return (
        <div className="hotel-info">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-5">
                            <img className="hotel-image" src={imgUrl} alt=""/>
                        </div>
                        <div className="col-md-7">
                            <h6>{hotelName}</h6>
                            <div className="room-info">
                                <span>4 Guests</span>
                                <span>2 Bedrooms</span>
                                <span>2 Beds</span>
                                <span>2 Baths</span>
                            </div>
                            <p>{description}</p>
                            <div className="hotel-info">
                                <span>4.9 (20)</span>
                                <span>34.99/night</span>
                                <span>55.99/total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotel;