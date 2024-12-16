export type BusItemType = {
	id: string;
	name: string;
	type: string;
	lines: Line[];
};

export interface Line extends BusItemType {
	id: string;
	name: string;
	code: string;
	iconUrl: string;
    mode: string;
	style: Style;
}

export interface Style extends BusItemType {
	color: string;
	textColor: string;
}

export interface Coordinates extends BusItemType {
	latitude: number;
	longitude: number;
}

export type NextDeparture = {
	departure: string;
	id: string;
	line: Line;
	route: Route;
	stopPointId: string;
};

export type Route = {
	id: string;
	name: string;
	terminus: string;
};

export type Stop = {
	coordinates: Coordinates;
	name: string;
	stopAreaId: string;
	nextDepartures: NextDeparture[];
};
