import type City from '@/features/cities/models/city';
import type User from '@/features/users/models/user';

export default interface Club {
  id: number
  leader: User | null,
  club_name: string,
  addr_street_number: string,
  addr_street_name: string,
  email: string,
  contact_number: string,
  landline_number: string,
  post_code: number,
  city: City,
  status: string,
  members: User[] | null
}