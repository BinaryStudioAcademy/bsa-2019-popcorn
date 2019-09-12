import { ITop } from '../../TopListPage/TopListItem';

export interface ITopItem extends ITop {
	isNewTop?: boolean;
}

export interface IMovie {
	id: number;
	comment: string;
	movie: {
		id?: string;
		release_date?: string;
		title: string;
	};
}
