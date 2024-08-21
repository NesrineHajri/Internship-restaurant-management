import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './reservation.css';

function Reservation() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  // Structure des options horaires
  const timeOptions = {
    Breakfast: ["7h00", "7h30", "8h00", "8h30"],
    Lunch: ["11h30", "12h00", "12h30", "13h00"],
    Dinner: ["18h00", "18h30", "19h00", "19h30"]
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="reservation-container">
      <div className="calendar-container">
        <h2>Reserve your date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          dateFormat="P"
          className="datepicker"
        />
      </div>
      <div className="timepicker-container">
        <h2>Choose the time</h2>
        <div className="time-options">
          {Object.keys(timeOptions).map((meal, index) => (
            <div key={index} className="meal-group">
              <h3>{meal}</h3>
              <div className="meal-times">
                {timeOptions[meal].map((time, idx) => (
                  <button
                    key={idx}
                    className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reservation;
