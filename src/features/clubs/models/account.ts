import type Card from './card';

export default interface Account {
  id: number;
  uid: string;
  name: string;
  cards: Card[] | null;
  entity_type: string;
  entity_id: number;
  discount_rate: number;
  status: string;
  balance: number;
}
