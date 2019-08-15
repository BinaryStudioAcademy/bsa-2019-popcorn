// formater for event data
export interface IEventFormatFromEditor {
	id?: string;
	title: string;
	description: string;
	location: {
		lat: number;
		lng: number;
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
	location: {
		lat: number;
		lng: number;
	};
}

export interface IventFormatToSave {
	id?: string;
	title: string;
	description: string;
	image: string;
	location_lat: number;
	location_lng: number;
	start_date: undefined | Date;
	end_date: undefined | Date;
	isPrivate: boolean;
	userId: string;
	movieId: null | string;
}
export interface IEventFormatDataBase extends IventFormatToSave {
	id: string;
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
		location_lat: location.lat,
		location_lng: location.lng,
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
