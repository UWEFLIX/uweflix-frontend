import axios from 'axios';
import getApiHeaders from '@/constants/api_headers';

const baseURL = import.meta.env.VITE_API_ENDPOINT;

interface IBookingRepository {
  getBookedSeats(token: string, scheduleId: number): Promise<String[]>;
  bookSeats(token: string, scheduleId: number, data: Object): Promise<void>;
}

export default class BookingRepository implements IBookingRepository {
  async getBookedSeats(token: string, scheduleId: number) {
    const res = await axios.get(`${baseURL}/bookings/bookings/booked-seats/${scheduleId}`, {
      headers: getApiHeaders(token)
    });

    return res.data as String[];
  }

  async bookSeats(token: string, scheduleId: number, data: Object): Promise<void> {
    await axios.post(`${baseURL}/bookings/users/bookings/multiple/${scheduleId}`, data, {
      headers: getApiHeaders(token)
    });
  }
}
