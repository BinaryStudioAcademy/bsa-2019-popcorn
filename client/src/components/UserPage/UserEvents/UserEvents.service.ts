// formater for event data

export interface IEventFormatClient {
	id: string;
	title: string;
	description: string;
	location: {
		lat: number;
		lng: number;
	};
	dateRange: {
		startDate: Date;
		endDate: Date;
	};
	userId: string;
	image: string;
	isPrivate: boolean;
	movieId: string;
	eventVisitors: IVisitor[];
}

export interface IEventFormatDataBase {
	id: string;
	title: string;
	description: string;
	image: string;
	location_lat: number;
	location_lng: number;
	start_date: Date;
	end_date: Date;
	isPrivate: boolean;
	userId: string;
	movieId: string;
	eventVisitors: IVisitor[];
}

interface IVisitor {
	id: string;
	status: string;
	userId: string;
	eventId: string;
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
		eventVisitors
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
		eventVisitors
	};
	return formatEvent;
};

export const formatToDataBase = (event: IEventFormatClient): any => {
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
	const formatEvent = {
		title,
		description,
		image,
		location_lat: location.lat,
		location_lng: location.lng,
		start_date: dateRange.startDate,
		end_date: dateRange.endDate,
		isPrivate,
		userId,
		movieId
	};
	return formatEvent;
};
