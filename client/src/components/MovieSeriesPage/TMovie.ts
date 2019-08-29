import { IDiscussionMessage } from './DiscussionComponent/DiscussionComponent';

type TMovie = {
	id: string;
	poster_path: string;
	runtime: number;
	title: string;
	release_date?: string;
	genres: string;
	overview: string;
	budget: number;
	vote_average: string;
	video: string;
	cast: any;
	mainCast: string;
	crew: any;
	messages: IDiscussionMessage[];
	hasVideo: boolean;
	imdb_id: string;
};

export default TMovie;
