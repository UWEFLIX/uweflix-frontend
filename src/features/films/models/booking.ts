import type Account from '@/features/clubs/models/account';
import type Schedule from './schedule';
import type PersonType from './person_type';

export default interface Booking {
  id: number;
  seat_no: string;
  schedule: Schedule;
  status: string;
  account: Account;
  person_type: PersonType;
  amount: number;
  serial_no: string;
  batch_ref: string;
  created: string;
  assigned_user: number;
  class_name: string;
}
