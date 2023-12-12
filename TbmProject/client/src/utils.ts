import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getColorFromLineType(lineType: string) {
	const colorsMap: Record<string, string> = {
		liane: "yellow",
		corol: "blue",
		rail: "green",
		ferry: "purple",
		unknown: "gray",
	};

	return colorsMap[lineType] ?? "gray";
}
