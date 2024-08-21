import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservations'; // URL du backend Spring Boot

class ReservationService {
    createReservation(reservation) {
        return axios.post(API_URL, reservation);
    }

    getReservations() {
        return axios.get(API_URL);
    }

    // Vous pouvez ajouter d'autres méthodes pour des opérations CRUD supplémentaires
}

export default new ReservationService();
