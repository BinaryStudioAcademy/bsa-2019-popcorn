export interface ITopItem {
    id: string;
    title: string;
	topImageUrl: string;
	moviesList: IMovie[];
    isOwnTop: boolean;
    isNewTop?: boolean;
}

export interface IMovie {
	id: string;
	title: string;
	comment: string;
}

export function convertServerDataFormatToClient(serverData: any[]): ITopItem[] {
    console.log(serverData);

    const clientDataFormat: ITopItem[] = serverData.map((top) => {
        return {
            id: top.id,
            title: top.title,
            topImageUrl: top.topImageUrl,
            moviesList: top.movieInTop.map(movieInTop => ({
                id: movieInTop.id,
                title: movieInTop.movie.title,
                comment: movieInTop.comment
            })),
            isOwnTop: true
        };
    });

    return clientDataFormat;
}
