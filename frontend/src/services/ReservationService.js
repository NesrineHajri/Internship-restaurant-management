import axios from 'axios';

const API_URL = 'http://localhost:8094/api/reservations'; // URL of the backend Spring Boot

class ReservationService {
    async createReservation(reservation) {
        try {
            const response = await axios.post(API_URL, reservation);
            return response.data;
        } catch (error) {
            console.error("Error creating reservation:", error);
            throw error;
        }
    }

    async getReservations() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching reservations:", error);
            throw error;
        }
    }

    async getReservationById(reservationId) {
        try {
            const response = await axios.get(`${API_URL}/${reservationId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching reservation with ID ${reservationId}:`, error);
            throw error;
        }
    }

    async updateReservation(reservationId, reservation) {
        try {
            const response = await axios.put(`${API_URL}/${reservationId}`, reservation);
            return response.data;
        } catch (error) {
            console.error(`Error updating reservation with ID ${reservationId}:`, error);
            throw error;
        }
    }

    async deleteReservation(reservationId) {
        try {
            await axios.delete(`${API_URL}/${reservationId}`);
        } catch (error) {
            console.error(`Error deleting reservation with ID ${reservationId}:`, error);
            throw error;
        }
    }
}

export default new ReservationService();
