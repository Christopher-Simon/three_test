import React from "react";
// import annotation from "./annotation.json";
import { Html } from "@react-three/drei";
import annotations from "./annotations.json";
import "./Annotation.css";
// import { Vector3 } from "@react-three/fiber";
// import { Peoplecamtype } from "./App" ;

// interface AnnotationProps {
// 	setMode: Dispatch<React.SetStateAction<number>>;
// }

export default function Annotation() {
	const handleClick = (title: string, i: number) => {
		document.location = `http://localhost:3000/#${title}`;
		// setMode(i + 1);
		console.log(i + 1);
		console.log(title);
	};
	return (
		<>
			{annotations.map((a, i) => (
				<Html key={1} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
					<div className="button_all">
						<svg
							height="34"
							width="34"
							className="annotation"
							transform="translate(-16 -16)"
							style={{ cursor: "pointer" }}
						>
							<circle
								cx="17"
								cy="17"
								r="16"
								// stroke="white"
								strokeWidth="2"
								fill="rgba(0,0,0,.66)"
								// onClick={() => setLerping(true)}
								onClick={() => handleClick(a.title, i)} // ; document.location = "http://localhost:3000?toto"; }}
							/>
							<text
								x="12"
								y="22"
								fill="white"
								fontSize={17}
								fontFamily="monospace"
								style={{ pointerEvents: "none" }}
							>
								{i + 1}
							</text>
						</svg>
						{a.description && (
							<div
								id="desc_"
								className="annotationDescription"
								dangerouslySetInnerHTML={{ __html: a.description }}
							/>
						)}
					</div>
				</Html>
			))}
		</>
	);
	// if (lerping === 2 || lerping === 3) {
	// 	return (
	// 		<Html position={[0, -3, 0]}>
	// 			<div>
	// 				lol
	// 			</div>
	// 		</Html>
	// 	);
	// }
}
