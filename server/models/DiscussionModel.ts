export class Discussion {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
  movieId: string;
}

export class ExtendedDiscussion extends Discussion {
  avatar: string;
  name: string;
}
