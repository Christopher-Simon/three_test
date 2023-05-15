// import React from "react";
import React, { Dispatch } from "react";

// import { Html } from "@react-three/drei";
interface ButtonProps {
	mode: number;
	setLerping: Dispatch<React.SetStateAction<number>>;
	// setMode: Dispatch<React.SetStateAction<number>>;
}

export default function Buttons({ mode, setLerping }: ButtonProps) {
	if (mode === 2 || mode === 3) {
		return (
			<button
				type="button"
				onClick={() => setLerping(4)}
			>
				exit
			</button>
		);
	}
	if (mode === 1) {
		return (
			<>
				<button
					type="button"
					onClick={() => setLerping(4)}
				>
					exit the game
				</button>
				<button
					type="button"
					onClick={() => setLerping(1)}
				>
					Recenter Cam
				</button>
				{/* <button
					type="button"
					onClick={() => setLerping(5)}
				>
					Vertical view
				</button> */}
			</>
		);
	}
	return <div>none</div>;
}
