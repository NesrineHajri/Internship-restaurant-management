import React, { useState } from 'react';
import ReservationService from '../../services/ReservationService.js';
import './AddReservation.css'; // Import du fichier CSS

function AddReservation() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        reserveFor: ''
    });
    const [step, setStep] = useState('selectDate');
    const [message, setMessage] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setStep('selectTime');
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
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
            date: selectedDate,
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
        setSelectedDate('');
        setSelectedTime('');
        setFormData({
            firstName: '',
            lastName: '',
            mobileNumber: '',
            reserveFor: ''
        });
        setStep('selectDate');
    };

    return (
        <div className="reservation-container">
            <h1>PICK A DAY YOU LIKE</h1>
            {step === 'selectDate' && (
                <div className="form-group">
                    <label htmlFor="date">Select Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        required
                    />
                </div>
            )}
            {step === 'selectTime' && (
                <div className="form-group">
                    <label htmlFor="time">Select Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        required
                    />
                </div>
            )}
            {step === 'fillForm' && (
                <form onSubmit={handleSubmit} className="reservation-form">
                    <h2>SELECT A TIME BY A CLICK</h2>
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
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
                    <div className="form-group">
                        <label htmlFor="reserveFor">Reserve For:</label>
                        <input
                            type="text"
                            id="reserveFor"
                            name="reserveFor"
                            value={formData.reserveFor}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Reserve My Table</button>
                </form>
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default AddReservation;
