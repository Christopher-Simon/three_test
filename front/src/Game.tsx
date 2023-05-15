import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useRef } from "react";
// import {
// 	MeshStandardMaterial,
// } from "three";

function Racket() {
	const meshRef = useRef<THREE.Mesh>(null);

	return (
		<mesh
			ref={meshRef}
			position={[-10, 0, 0]}
			onPointerDown={(e) => console.log(e.object.name)}
		>
			<boxGeometry args={[10, 10, 10]} />
			<meshBasicMaterial color="red" />
		</mesh>
	);
}

export default function Game({ mode }: { mode: number }) {
	const meshRef = useRef<THREE.Mesh>(null);
	let dir = 1;
	useFrame(() => {
		// const time = clock.getElapsedTime();
		if (meshRef.current) {
			if (meshRef.current.position.x + 0.1 >= 17) {
				dir *= -1;
				meshRef.current.position.x += 0.1 * dir;
			} else if (meshRef.current.position.x - 0.1 <= -17) {
				dir *= -1;
				meshRef.current.position.x += 0.1 * dir;
			} else {
				meshRef.current.position.x += 0.1 * dir;
			}
		}
		//   meshRef.current.rotation.y = Math.cos(time * 3) * Math.PI / 4; // Rotate around the y-axis
		//   meshRef.current.rotation.z = Math.sin(time * 4) * Math.PI / 4; // Rotate around the z-axis
	});
	if (mode !== 1) {
		return <mesh />;
	}
	return (
		<mesh
			castShadow
			receiveShadow
		>
			<mesh
				position={[17, 2, 0]}
				castShadow
				receiveShadow
			>
				<boxGeometry
					attach="geometry"
					args={[0.5, 0.5, 16]}
				/>
			</mesh>
			<Racket />
			<mesh
				ref={meshRef}
				position={[0, 2, 0]}
				receiveShadow
				castShadow
				// name="meshStandardMaterial"
				// material={
				// 	new MeshStandardMaterial({
				// 		color: "red",
				// 		map: texture,
				// 		flatShading: true,
				// 	})
				// }
			>
				<Sphere
					args={[1, 30, 30]}
					receiveShadow
					castShadow
				/>
			</mesh>
			<mesh
				position={[-17, 2, 0]}
				castShadow
				receiveShadow
			>
				<boxGeometry
					attach="geometry"
					args={[0.5, 0.5, 16]}
				/>
				{/* <Sphere
					position={[0, 0.5, 0]}
					args={[0.2, 30, 30]}
					receiveShadow
					castShadow
				/> */}
			</mesh>
		</mesh>
	);
}
