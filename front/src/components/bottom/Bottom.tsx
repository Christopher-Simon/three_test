import React, { Dispatch } from "react";
import Imagebutton from "../imagebutton/Imagebutton";
import "./Bottom.css";

interface ButtonProps {
	mode: number;
	setLerping: Dispatch<React.SetStateAction<number>>;
	transition: boolean;
}

function Bottom({ mode, setLerping, transition }: ButtonProps) {
	const handleClick = (title: string, i: number) => {
		document.location = `http://localhost:3000/#${title}`;
		// setMode(i + 1);
		console.log(i + 1);
		console.log(title);
	};
	return (
		<div className="Bottom">
			<div className="Bottomleft">
				{mode === 1 && transition === false && <button type="button" onClick={() => setLerping(1)}>Horizontal view</button>}
				{mode === 1 && transition === false && <button type="button" onClick={() => setLerping(5)}>Vertical view</button>}
				{mode === 1 && transition === false && <button type="button" onClick={() => setLerping(6)}>fps view</button>}
			</div>
			<div className=" Bottomcenter">
				{mode === 1 && transition === false && <button type="button" onClick={() => handleClick("home", 4)}>Exit the game</button>}
				{(mode === 2 || mode === 3) && transition === false && <button type="button" onClick={() => handleClick("home", 4)}>Exit</button>}
			</div>
			<div />
		</div>
	);
}

export default Bottom;
