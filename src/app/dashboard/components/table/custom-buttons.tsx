import { cn } from "@/lib/utils";
import { Button, type ButtonProps, Tooltip } from "@mantine/core";
import { KeyRound, Stethoscope, ToggleLeft, ToggleRight } from "lucide-react";
import type { ReactNode } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { LuEye, LuTrash } from "react-icons/lu";

interface DestructiveButtonProps extends ButtonProps {
	children: ReactNode;
	onClick: () => void;
}

export function DestructiveButton({
	children,
	...props
}: DestructiveButtonProps) {
	return (
		<Button color={"red.8"} className=" w-full" {...props}>
			{children}
		</Button>
	);
}

export function ViewButton({
	open,
	label,
}: { open: () => void; label: string }) {
	return (
		<Tooltip
			label={label}
		>
			<button
				type={"button"}
				onClick={open}
				color={"none"}
				className={"group p-2 bg-blue-1 hover:bg-blue-6 rounded-md"}
			>
				<LuEye className={"text-blue-6 group-hover:text-blue-1"} size={16} />
			</button>
		</Tooltip>
	);
}

export function EditButton({
	open,
	label,
}: { open: () => void; label: string }) {
	return (
		<Tooltip
			label={label}
		>
			<button
				type={"button"}
				onClick={open}
				color={"none"}
				className={"group p-2 bg-blue-1 hover:bg-blue-6 rounded-md"}
			>
				<FiEdit3 className={"text-blue-6 group-hover:text-blue-1"} size={16} />
			</button>
		</Tooltip>
	);
}

export function ActivateAndDeactivateButton({
	open,
	label,
	status,
}: { open: () => void; label: string; status: "INACTIVE" | "ACTIVE" }) {
	return (
		<Tooltip
			label={label}
			color={status === "ACTIVE" ? "red" : "blue"}
		>
			<button
				type={"button"}
				onClick={open}
				color={"none"}
				className={cn(
					"group p-2 rounded-md",
					status === "INACTIVE"
						? "bg-red-1 hover:bg-red-6"
						: "bg-blue-1 hover:bg-blue-6",
				)}
			>
				{status === "INACTIVE" ? (
					<ToggleLeft
						className={"text-red-6 group-hover:text-red-1"}
						size={20}
					/>
				) : (
					<ToggleRight
						className={"text-blue-6 group-hover:text-blue-1 "}
						size={20}
					/>
				)}
			</button>
		</Tooltip>
	);
}

export function ViewCalendarButton({
	open,
	label,
}: { open: () => void; label: string }) {
	return (
		<Tooltip
			label={label}

		>
			<button
				type={"button"}
				onClick={open}
				color={"none"}
				className={"group p-2 bg-blue-1 hover:bg-blue-6 rounded-md"}
			>
				<FaCalendarDays
					className={"text-blue-6 group-hover:text-blue-1"}
					size={16}
				/>
			</button>
		</Tooltip>
	);
}

export function DeleteButton({
	open,
	label,
}: { open: () => void; label: string }) {
	return (
		<Tooltip
			label={label}
			color={'red'}
		>
			<button
				type={"button"}
				onClick={open}
				color={"none"}
				className={"group p-2 bg-red-1 hover:bg-red-6 rounded-md"}
			>
				<LuTrash className={"text-red-6 group-hover:text-red-1"} size={16} />
			</button>
		</Tooltip>
	);
}

export function ChangePasswordButton({
	open,
	label,
}: { open: () => void; label: string }) {
	return (
		<Tooltip
			label={label}
		>
			<button
				type={"button"}
				onClick={open}
				color={"none"}
				className={"group p-2 bg-blue-1 hover:bg-blue-6 rounded-md"}
			>
				<KeyRound className={"text-blue-6 group-hover:text-blue-1"} size={16} />
			</button>
		</Tooltip>
	);
}

export function DoctorRecordButton({
	open,
	label,
}: { open: () => void; label: string }) {
	return (
		<Tooltip
			label={label}
		>
			<button
				type={"button"}
				onClick={open}
				color={"none"}
				className={"group p-3 bg-blue-1 hover:bg-blue-6 rounded-md"}
			>
				<Stethoscope
					className={"text-blue-6 group-hover:text-blue-1"}
					size={16}
				/>
			</button>
		</Tooltip>
	);
}
