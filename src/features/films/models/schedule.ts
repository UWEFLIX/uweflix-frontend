import type Hall from '@/features/halls/models/hall';
import type Film from './film';

export default interface Schedule {
  id: number;
  hall_id: number;
  film_id: number;
  show_time: string;
  on_schedule: boolean;
  ticket_price: number;
  class_name: string;
  hall: Hall;
  film: Film;
}
