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
	cast: string;
	messages: IDiscussionMessage[];
	hasVideo: boolean;
};

export default TMovie;
