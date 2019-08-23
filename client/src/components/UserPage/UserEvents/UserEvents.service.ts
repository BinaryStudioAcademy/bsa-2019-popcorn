// formater for event data
export interface IEventComment {
	id: string;
	text: string;
	createdAt: string;
	user: IDiscussionUser;
}

export interface IEventFormatFromEditor {
	id?: string;
	title: string;
	description: string;
	location: {
		lat: number | undefined;
		lng: number | undefined;
	};
	dateRange: {
		startDate: undefined | Date;
		endDate: undefined | Date;
	};
	movieId: null | string;
	userId: string;
	image: string;
	isPrivate: boolean;
}

export interface IEventFormatClient extends IEventFormatFromEditor {
	id: string;
	eventVisitors: IVisitor[];
	eventComments: IEventComment[];
	location: {
		lat: number | undefined;
		lng: number | undefined;
	};
}

export interface IventFormatToSave {
	id?: string;
	title: string;
	description: string;
	image: string;
	location_lat: number | undefined;
	location_lng: number | undefined;
	start_date: undefined | Date;
	end_date: undefined | Date;
	isPrivate: boolean;
	userId: string;
	movieId: null | string;
}
export interface IEventFormatDataBase extends IventFormatToSave {
	id: string;
	eventVisitors: IVisitor[];
	eventComments: IEventComment[];
}

export interface IVisitor {
	id: string;
	status: string;
	userId: string;
	eventId: string;
	user: IDiscussionUser;
}

export interface IDiscussionUser {
	avatar?: string;
	name: string;
	id: string;
}

export const formatToClient = (
	event: IEventFormatDataBase
): IEventFormatClient => {
	const {
		id,
		title,
		description,
		image,
		location_lat,
		location_lng,
		start_date,
		end_date,
		isPrivate,
		userId,
		movieId,
		eventVisitors,
		eventComments
	} = event;
	const formatEvent = {
		id,
		title,
		description,
		location: {
			lat: location_lat,
			lng: location_lng
		},
		dateRange: {
			startDate: start_date,
			endDate: end_date
		},
		userId,
		image,
		isPrivate,
		movieId,
		eventVisitors,
		eventComments
	};
	return formatEvent;
};

export const formatToDataBase = (
	event: IEventFormatFromEditor
): IventFormatToSave => {
	const {
		title,
		description,
		location,
		dateRange,
		userId,
		image,
		isPrivate,
		movieId
	} = event;
	let formatEvent = {
		title,
		description,
		image,
		location_lat: location && location.lat,
		location_lng: location && location.lng,
		start_date: dateRange.startDate,
		end_date: dateRange.endDate,
		isPrivate,
		userId,
		movieId
	};

	if (event.id) {
		formatEvent['id'] = event.id;
	}

	return formatEvent;
};
