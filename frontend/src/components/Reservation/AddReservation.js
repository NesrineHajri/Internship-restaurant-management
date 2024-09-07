/*
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { saveReservation } from '../../services/ReservationService'; // Utiliser saveReservation au lieu de createReservation
import './AddReservation.css';

function AddReservation() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        reserveFor: '' // Conserver uniquement reserveFor
    });
    const [step, setStep] = useState('selectDate'); // Étape actuelle
    const [message, setMessage] = useState('');

    // Obtenez la date actuelle
    const today = new Date();

    const timeOptions = {
        Breakfast: ["7h00", "7h30", "8h00", "8h30"],
        Lunch: ["11h30", "12h00", "12h30", "13h00"],
        Dinner: ["18h00", "18h30", "19h00", "19h30"]
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setStep('selectTime'); // Changer à l'étape de sélection de l'heure après la sélection de la date
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const reservation = {
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            ...formData
        };

        saveReservation(reservation) // Utiliser saveReservation au lieu de createReservation
            .then(response => {
                setMessage('Reservation created successfully!');
                resetForm();
            })
            .catch(error => {
                console.error('Error creating reservation:', error);
                setMessage('Failed to create reservation. Please try again.');
            });
    };

    const resetForm = () => {
        setSelectedDate(null);
        setSelectedTime('');
        setFormData({
            reserveFor: '' // Réinitialiser uniquement reserveFor
        });
        setStep('selectDate'); // Réinitialiser l'étape à la sélection de la date
        setMessage('');
    };

    return (
        <div className="reservation-container">
            {step === 'selectDate' && (
                <div className="calendar-container">
                    <h1>PICK A DAY YOU LIKE</h1>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        minDate={today} // Bloquer les jours passés
                    />
                </div>
            )}
            {step === 'selectTime' && (
                <div className="timepicker-container">
                    <h2>SELECT A TIME BY A CLICK</h2>
                    {Object.keys(timeOptions).map((meal, index) => (
                        <div key={index} className="meal-group">
                            <h3>{meal}</h3>
                            <div className="meal-times">
                                {timeOptions[meal].map((time, idx) => (
                                    <button
                                        key={idx}
                                        className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                                        onClick={() => handleTimeChange(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {selectedTime && (
                        <div className="form-container">
                            <div className="form-group custom-form-group">
                                <label htmlFor="reserveFor">Reserve For:</label>
                                <select
                                    id="reserveFor"
                                    name="reserveFor"
                                    value={formData.reserveFor}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Reserve My Table</button>
                        </div>
                    )}
                </div>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddReservation;
*/
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { saveReservation } from '../../services/ReservationService';
import './AddReservation.css';

function AddReservation() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [reservationTime, setReservationTime] = useState('');
    const [formData, setFormData] = useState({
        numberOfGuests: '' // Ensure it's a string, but can be converted to a number if needed
    });
    const [step, setStep] = useState('selectDate');
    const [message, setMessage] = useState('');

    // Get current date
    const today = new Date();

    const timeOptions = {
        Breakfast: ["7h00", "7h30", "8h00", "8h30"],
        Lunch: ["11h30", "12h00", "12h30", "13h00"],
        Dinner: ["18h00", "18h30", "19h00", "19h30"]
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setStep('selectTime');
    };

    const handleTimeChange = (time) => {
        setReservationTime(time);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const reservation = {
            date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
            reservationTime: reservationTime,
            numberOfGuests: parseInt(formData.numberOfGuests, 10) // Convert to number
        };

        console.log('Submitting reservation:', reservation);

        saveReservation(reservation)
            .then(response => {
                setMessage('Reservation created successfully!');
                resetForm();
            })
            .catch(error => {
                console.error('Error creating reservation:', error);
                setMessage('Failed to create reservation. Please try again.');
            });
    };

    const resetForm = () => {
        setSelectedDate(null);
        setReservationTime('');
        setFormData({
            numberOfGuests: ''
        });
        setStep('selectDate');
        setMessage('');
    };

    return (
        <div className="reservation-container">
            {step === 'selectDate' && (
                <div className="calendar-container">
                    <h1>PICK A DAY YOU LIKE</h1>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        minDate={today}
                    />
                </div>
            )}
            {step === 'selectTime' && (
                <div className="timepicker-container">
                    <h2>SELECT A TIME BY A CLICK</h2>
                    {Object.keys(timeOptions).map((meal, index) => (
                        <div key={index} className="meal-group">
                            <h3>{meal}</h3>
                            <div className="meal-times">
                                {timeOptions[meal].map((time, idx) => (
                                    <button
                                        key={idx}
                                        className={`time-option ${reservationTime === time ? 'selected' : ''}`}
                                        onClick={() => handleTimeChange(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {reservationTime && (
                        <form onSubmit={handleSubmit} className="form-container">
                            <div className="form-group custom-form-group">
                                <label htmlFor="numberOfGuests">Number of Guests:</label>
                                <select
                                    id="numberOfGuests"
                                    name="numberOfGuests"
                                    value={formData.numberOfGuests}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value=""></option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Reserve My Table</button>
                        </form>
                    )}
                </div>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddReservation;
