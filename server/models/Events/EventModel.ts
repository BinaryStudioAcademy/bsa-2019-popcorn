export class Event {
  id: string;
  title: string;
  description: string;
  location_lat?: number;
  location_lng?: number;
  start_date: Date;
  end_date: Date;
  image: string;
  isPrivate: boolean;
  userId: string;
  movieId?: string;
}
