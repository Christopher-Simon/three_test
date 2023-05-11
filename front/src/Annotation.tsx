import React, { Dispatch } from "react";
// import annotation from "./annotation.json";
import { Html } from "@react-three/drei";
import annotations from "../public/annotation.json";
import "./Annotation.css";

interface AnnotationProps {
	setLerping: Dispatch<React.SetStateAction<boolean>>;
	setBoard: Dispatch<React.SetStateAction<boolean>>;
}

export default function Annotation({ setLerping, setBoard }: AnnotationProps) {
	// useFrame((_, delta) =>
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
								onClick={() => setLerping(true)} // ; document.location = "http://localhost:3000?toto"; }}
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
						onClick={() => setLerping(true)}
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
