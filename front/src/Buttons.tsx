// import React from "react";
import React, { Dispatch } from "react";

// import { Html } from "@react-three/drei";
interface ButtonProps {
	lerping: number;
	setLerping: Dispatch<React.SetStateAction<number>>;
}

export default function Buttons({ lerping, setLerping } : ButtonProps) {
	if (lerping === 2 || lerping === 3) {
		return (
			<button
				type="button"
				onClick={() => setLerping(4)}
			>
				exit
			</button>
		);
	}
	if (lerping === 1) {
		return (
			<button
				type="button"
				onClick={() => setLerping(4)}
			>
				exit the game
			</button>
		);
	}
	return (
		<div>
			none
		</div>
	);
}
