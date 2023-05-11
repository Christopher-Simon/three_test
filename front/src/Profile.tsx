import { Html } from "@react-three/drei";
// import React, { Dispatch } from "react";
// import { parse } from 'query-string';
import { useRef } from "react";
// import { RefObject } from "react";
// import { Vector3 } from "three";
// import { useFrame, extend } from "@react-three/fiber";
// import * as THREE from "three";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { useThree } from "@react-three/fiber";
// import { OrbitControls } from "three-stdlib";
// import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
// export default function Profile({ x, y, z }: { x:number; y:number; z:number; }) {

interface ProfileProps {
	Board : boolean;
	// setBoard: Dispatch<React.SetStateAction<boolean>>;
}

export default function Profile({ Board } : ProfileProps) {
	// const textRef = useRef<HTMLDivElement>(null);
	// const textRef = useRef<THREE.Mesh>(null);
	// const textRef = useRef<HTMLDivElement>(null);
	// const { camera } = useThree();

	// useFrame(() => {
	// 	// Calculate the distance between the camera and the text
	// 	const distance = Math.sqrt(
	// 		(camera.position.x - x) ** 2 +
	// 		(camera.position.y - y) ** 2 +
	// 		(camera.position.z - z) ** 2
	// 	);
	// 	// Update the text position based on the distance from the camera
	// 	if (textRef.current) {
	// 		textRef.current.style.transform = `translateZ(${distance}px)`;
	// 	}
	// });

	// const { camera } = useThree();
	// console.log("x = %d / y = %d /z = %d",
	// camera.position.x, camera.position.y, camera.position.z);
	// useFrame(({ camera }) => {
	// 	if (textRef.current) {
	// 		const distance = camera.position.distanceTo(textRef.current.position);
	// 		textRef.current.scale.set(distance / 10, distance / 10, distance / 10);
	// 	}
	// });
	// useFrame(({ camera }) => {
	// 	if (objRef.current && textRef.current) {
	// 		const textPos = new Vector3();
	// 		// objRef.current.getWorldPosition(textPos);
	// 		// const camPos = camera.position;
	// 		// const distance = textPos.distanceTo(camPos);
	// 		// objRef.current.position.z = -distance;
	// 	}
	// });
	// const { camera } = useThree();
	// const { x, y, z } = camera.position;
	// if (x !== 15 && y !== 10 && z !== -10)
	// 	return;
	// if (camera.position.x !== 10 &&
	// 	&& camera.position.y !== 1
	// 	&& camera.position.z !== 5) {
	// 	return (
	// 		<Html>empty</Html>
	// 	);
	// }
	// if (camera.position.x > 8 && camera.position.x < 12
	// 	&& camera.position.y > -1 && camera.position.y < 3
	// 	&& camera.position.z > 3 && camera.position.z < 7) {
	const { camera } = useThree();
	const textRef = useRef<HTMLDivElement>(null);
	if (!Board) {
		return (
			<Html />
		);
	}
	return (
		<Html
			// ref={textRef}
			// ref={camera}
			occlude
			position={[7, 1, 0]}
			rotation={[0, Math.PI / 2, 0]}
			transform
		>
			<div
				// ref={textRef}
				style={{
					backgroundColor: "grey",
					borderRadius: "5px",
					padding: "10px",
					textAlign: "center",
					pointerEvents: "none",
				}}
			>
				{/* <text
					x="12"
					y="22"
					fill="white"
					fontSize={17}
					fontFamily="monospace"
					style={{ pointerEvents: "none" }}
				>
					profile2
				</text> */}
				<p ref={textRef} style={{ fontSize: "150%" }}>Profile</p>
			</div>
		</Html>
		// <>
		// 	{/* <mesh ref={textRef} position={[7, 1, 5]}>
		// 		<textGeometry args={["test", { size: 5, height: 10 }]} />
		// 		<meshBasicMaterial attach="material" color="white" />
		// 	</mesh> */}
		// 	<Html
		// 		// ref={textRef}
		// 		occlude
		// 		position={[7, 1, 5]}
		// 		rotation={[0, Math.PI / 2, 0]}
		// 		transform
		// 	>
		// 		<div
		// 			// ref={textRef}
		// 			style={{
		// 				backgroundColor: "grey",
		// 				borderRadius: "5px",
		// 				padding: "10px",
		// 				textAlign: "center",
		// 			}}
		// 		>
		// 			<p style={{ fontSize: "20px" }}>Profile</p>
		// 		</div>
		// 	</Html>
		// </>
	);
	// return (
	// 	<Html>empty</Html>
	// );
}
