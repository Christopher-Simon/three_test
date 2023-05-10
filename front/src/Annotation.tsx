import React, { Dispatch } from "react";
// import annotation from "./annotation.json";
import { Html } from "@react-three/drei";

interface AnnotationProps {
	setLerping: Dispatch<React.SetStateAction<boolean>>;
}

export default function Annotation({ setLerping }: AnnotationProps) {
	// useFrame((_, delta) => {

	// });

	return (
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
	);
}
