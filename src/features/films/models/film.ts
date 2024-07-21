export default interface Film {
  id: number;
  title: string;
  age_rating: string;
  duration_sec: number;
  trailer_desc: string;
  on_air_from: string;
  on_air_to: string;
  is_active: boolean;
  poster_image: string | null;
  images: string[] | null;
  schedules: null;
  class_name: string;
}
