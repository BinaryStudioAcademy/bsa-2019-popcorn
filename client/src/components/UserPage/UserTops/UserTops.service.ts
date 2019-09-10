export interface ITopItem {
	id: string;
	title: string;
	topImageUrl: string;
	moviesList: IMovie[];
	isNewTop?: boolean;
	created_at: Date;
}

export interface IMovie {
	id: number;
	title: string;
	comment: string;
	release_date?: string;
}

export function convertServerDataFormatToClient(
	serverData: any[]
): ITopItem[] | null {
	if (!serverData) {
		return null;
	}

	const clientDataFormat: ITopItem[] = serverData.map(top => {
		return {
			...top,
			id: top.id,
			title: top.title,
			topImageUrl: top.topImageUrl,
			moviesList: top.movieInTop.map(movie => ({
				id: movie.id,
				title: movie.title,
				comment: movie.comment,
				release_date: movie.release_date
			}))
		};
	});

	return clientDataFormat;
}
