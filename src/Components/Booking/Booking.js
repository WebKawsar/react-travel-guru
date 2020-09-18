import React, { useContext} from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import fakePlace from '../../fakeData/fakePlace';
import "./Booking.css";



const Booking = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const {place} = useParams();
    const {placeName, shortDestails} = fakePlace.find(tour => tour.placeName === place)

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = bookingData => {
        
        const newData = {...loggedInUser, bookingData};
        setLoggedInUser(newData);
        history.push(`/booking/${place}`)

    }



    return (
        <div className="place-details-section">
            <Container>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="details">
                            <h1>{placeName.toUpperCase()}</h1>
                            <p>{shortDestails}</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="booking-section">
                            <form onSubmit={ handleSubmit(onSubmit) }>

                                <label htmlFor="origin">Origin</label>
                                <select ref={register({required: "Select origin" })} name="origin" id="origin">
                                    <option value="">Select Origin</option>
                                    <option value="dhaka">Dhaka</option>
                                    <option value="sylhet">Sylhet</option>
                                    <option value="rajshahi">Rajshahi</option>
                                    <option value="khulna">Khulna</option>
                                    <option value="barishal">Barishal</option>
                                    <option value="chitagong">Chitagong</option>
                                    <option value="mymensingh">Mymensingh</option>
                                </select>
                                {errors.origin && <p  className="error">{errors.origin.message}</p> }
                                

                                <label htmlFor="destination">Destination</label>
                                <select  ref={register({required: "Select destination-" })} name="destination" id="destination">
                                    <option value="">Select Destination</option>
                                    <option value="coxsbazar">Coxs Bazar</option>
                                    <option value="sreemangal">Sreemangal</option>
                                    <option value="sundarbans">Sundarbans</option>
                                </select>
                                {errors.destination && <p  className="error">{errors.destination.message}</p> }
                                

                                <div className="left-date">
                                    <label htmlFor="from">From</label>
                                    <input ref={register({required: "Select start date" })} type="date" name="from" id="from" />
                                    {errors.from && <p  className="error">{errors.from.message}</p> }
                                </div>

                                <div className="right-date">
                                    <label htmlFor="to">To</label>
                                    <input ref={register({required: "Select end date" })} type="date" name="to" id="to" />
                                    {errors.to && <p  className="error">{errors.to.message}</p> }
                                </div>

                                <input type="submit" value="Start Booking"/>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Booking;