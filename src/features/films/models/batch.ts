import type Booking from './booking';

export default interface Batch {
  batch_ref: string;
  bookings: Booking[];
}
