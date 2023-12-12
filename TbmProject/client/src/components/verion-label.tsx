import { Icons } from "./icons";
import { cn } from "../utils";

type VersionLabelType = {
	version: string;
};

export function VersionLabel({ version }: VersionLabelType) {
	const color: string = "text-default-500";

	return (
		<p
			className={cn(
				"flex items-center gap-1 absolute bottom-3 right-3 text-xs",
				color
			)}>
			<Icons.version size={12} className={color} strokeWidth={1.5} /> v
			{version}
		</p>
	);
}
