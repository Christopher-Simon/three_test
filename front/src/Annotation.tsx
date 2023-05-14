import React, { Dispatch } from "react";
// import annotation from "./annotation.json";
import { Html } from "@react-three/drei";
import annotations from "./annotation.json";
import "./Annotation.css";
// import { Vector3 } from "@react-three/fiber";
// import { Peoplecamtype } from "./App" ;

// interface Peoplecamtype {
// 	// position: Vector3;
// 	// camera: Vector3;
// 	clic : number;
// }

interface AnnotationProps {
	mode: number;
	setLerping: Dispatch<React.SetStateAction<number>>;
}

// function goto({ people_cam } : {people_cam:people_camtype; }) {
// 	people_cam.position.x = 10;
// 	people_cam.position.y = 1;
// 	people_cam.position.z = 5;
// 	people_cam.camera.x = 0;
// 	people_cam.camera.y = 1;
// 	people_cam.camera.z = 5;
// }

export default function Annotation({ mode, setLerping }: AnnotationProps) {
	// useFrame((_, delta) =>

	// function handlerclick(i: number) {
	// 	clic = i;
	// 	console.log(clic);
	// 	setLerping(true);
	// }
	if (mode === 0) { // lerping === 0
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
									onClick={() => setLerping(i + 1)} // ; document.location = "http://localhost:3000?toto"; }}
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
								<div id="desc_" className="annotationDescription" dangerouslySetInnerHTML={{ __html: a.description }} />
							)}
						</div>
					</Html>
				))}
				<Html
					position={[0, 10, 0]}
					transform
					occlude
				>
					<svg
						height={100}
						width={100}
						transform="translate( -16 -16)"
						display="flex"
					>
						<circle
							cx={16}
							cy={16}
							r={16}
							onClick={() => setLerping(1)}
						/>
						<text
							x="13"
							y="25"
							fill="white"
							fontSize={25}
						>
							i
						</text>
					</svg>
					{/* {annotation.map((a, i) => (
							return {
								<Html key={i} position={[a.lookAt.x, a.lookAt.y, a.lookAt.z]}>
									<p>hello</p>
								<Html/>
							};
						))} */}
				</Html>
			</>
		);
	}
	// if (lerping === 2 || lerping === 3) {
	// 	return (
	// 		<Html position={[0, -3, 0]}>
	// 			<div>
	// 				lol
	// 			</div>
	// 		</Html>
	// 	);
	// }
	return (
		<Html>
			<div>
				bidule
			</div>
		</Html>
	);
}
