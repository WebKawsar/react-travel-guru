import React from 'react';
import "./Hotel.css";



const Hotel = (props) => {

    const {hotelName, description, imgUrl, bed, capacity, bedroom, baths, halfprice, totalPrice, ratings, ratingsPerson, starImg, place} = props.hotelInfo;

    return (
        <div className="hotel-info">
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-5">
                            <img className="hotel-image" src={imgUrl} alt=""/>
                        </div>
                        <div className="col-md-7">
                            <h6>{hotelName}</h6>
                            <div className="room-info">
                                <span>{capacity} guests</span>
                                <span>{bedroom} bedrooms</span>
                                <span>{bed} beds</span>
                                <span>{baths} baths</span>
                            </div>
                            <p>{description}</p>
                            <div className="hotel-details-footer">
                                <span><img className="ratings-image" src={starImg} alt=""/> {ratings} ({ratingsPerson})</span>
                                <span>$ {halfprice}/night</span>
                                <span>$ {totalPrice}/total</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotel;