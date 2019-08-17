type TMovie = {
	id: string;
	poster_path: string;
	runtime: number;
	title: string;
	release_date?: string;
	genres: Array<string>;
	overview: string;
	budget: number;
	vote_average: number;
};

export default TMovie;
