import React from "react";

interface DocumentIconProps {
	width?: number;
	height?: number;
	className?: string;
}

export default function DocumentIcon({
	width = 80,
	height = 80,
	className = "",
}: DocumentIconProps) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 80 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}>
			<path
				d="M50 10H20C17.3478 10 14.8043 11.0536 12.9289 12.9289C11.0536 14.8043 10 17.3478 10 20V60C10 62.6522 11.0536 65.1957 12.9289 67.0711C14.8043 68.9464 17.3478 70 20 70H60C62.6522 70 65.1957 68.9464 67.0711 67.0711C68.9464 65.1957 70 62.6522 70 60V30L50 10Z"
				fill="#C4B5FD"
			/>
			<path
				d="M30 40H50M30 50H50M50 10V30H70"
				stroke="#7C3AED"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
