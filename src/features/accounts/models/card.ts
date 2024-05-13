export default interface Card {
  id: number;
  account_id: number;
  card_number: number;
  holder_name: string;
  expiry_date: string;
  status: string;
}
