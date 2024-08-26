import React, { useState } from 'react';
import Calendar from 'react-calendar';
import ReservationService from '../../services/ReservationService.js';
import './AddReservation.css';

function AddReservation() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        reserveFor: '' // Default to empty
    });
    const [step, setStep] = useState('selectDate');
    const [message, setMessage] = useState('');

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
        setSelectedTime(time);
        setStep('fillForm');
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

        ReservationService.createReservation(reservation)
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
        setSelectedDate(new Date());
        setSelectedTime('');
        setFormData({
            firstName: '',
            lastName: '',
            mobileNumber: '',
            reserveFor: '' // Reset to empty
        });
        setStep('selectDate');
    };

    return (
        <div className="reservation-container">
            {step === 'selectDate' && (
                <div className="calendar-container">
                    <h1>PICK A DAY YOU LIKE</h1>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
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
                </div>
            )}
            {step === 'fillForm' && (
                <form onSubmit={handleSubmit} className="reservation-form">
                    <h1>FILL IN BOOKING DETAIL</h1>
                    <div className="form-group custom-form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group custom-form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group custom-form-group">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit mobile number."
                        />
                    </div>
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
                    <button type="submit" className="btn btn-primary">Reserve My Table</button>
                </form>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddReservation;
