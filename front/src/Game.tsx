import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
// import {
// 	MeshStandardMaterial,
// } from "three";

function useKeyboard() {
	const keyMap = useRef<any>({});

	useEffect(() => {
		const onDocumentKey = (e: any) => {
			keyMap.current[e.code] = e.type === "keydown";
		};
		document.addEventListener("keydown", onDocumentKey);
		document.addEventListener("keyup", onDocumentKey);
		return () => {
			document.removeEventListener("keydown", onDocumentKey);
			document.removeEventListener("keyup", onDocumentKey);
		};
	});

	return keyMap.current;
}

function Ball({
	BallRef,
	Rack1Ref,
}: {
	BallRef: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
	Rack1Ref: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
}) {
	// const meshRef = useRef<THREE.Mesh>(null);
	const ref = BallRef;
	let dir = 1;
	const rayon = 1;
	const speed = 0.3;
	// let a = 0;
	// let b = 0;
	// let angle = 0;
	useFrame(() => {
		// const time = clock.getElapsedTime();
		if (!ref.current) return;
		if (!Rack1Ref.current) return;
		if (ref.current.position.x + rayon + 0.1 >= 17) {
			dir *= -1;
			ref.current.position.x += speed * dir;
			// pos z
		} else if (ref.current.position.x - rayon - 0.1 <= -17) {
			dir *= -1;
			ref.current.position.x = 0;
			ref.current.position.z = 0;
		} else {
			ref.current.position.x += speed * dir;
			// ref.current.position.z = ref.current.position.z;
		}
		if (ref.current.position.x - rayon - 0.5 - 0.0001 < -15) {
			if (
				ref.current.position.z < Rack1Ref.current.position.z + 5 / 2 &&
				ref.current.position.z > Rack1Ref.current.position.z
			) {
				// angle = 45 * ref.current.position.z * 2 / 5 * Math.PI / 180;
				dir *= -1;
				ref.current.position.x += speed * dir;
			} else if (
				ref.current.position.z > Rack1Ref.current.position.z - 5 / 2 &&
				ref.current.position.z < Rack1Ref.current.position.z
			) {
				// angle = 45 * ref.current.position.z * 2 / 5 * Math.PI / 180;
				dir *= -1;
				ref.current.position.x += speed * dir;
			} else if (ref.current.position.z === Rack1Ref.current.position.z) {
				dir *= -1;
				ref.current.position.x += speed * dir;
			} else if (
				Math.abs(
					ref.current.position.z - (Rack1Ref.current.position.z + 5 / 2)
				) < rayon ||
				Math.abs(
					ref.current.position.z - (Rack1Ref.current.position.z - 5 / 2)
				) < rayon
			) {
				if (
					(Rack1Ref.current.position.z - 5 / 2 - ref.current.position.z) ** 2 +
						(Rack1Ref.current.position.x + 0.5 - ref.current.position.x) ** 2 <=
						1 ||
					(Rack1Ref.current.position.z + 5 / 2 - ref.current.position.z) ** 2 +
						(Rack1Ref.current.position.x + 0.5 - ref.current.position.x) ** 2 <=
						1
				) {
					dir *= -1;
					ref.current.position.x += speed * dir;
				}
				// dir *= -1;
				// ref.current.position.x += speed * dir;
			}
		}

		//   meshRef.current.rotation.y = Math.cos(time * 3) * Math.PI / 4; // Rotate around the y-axis
		//   meshRef.current.rotation.z = Math.sin(time * 4) * Math.PI / 4; // Rotate around the z-axis
	});
	return (
		<mesh
			ref={ref}
			position={[0, 2, 0]}
			receiveShadow
			castShadow
		>
			<Sphere
				args={[rayon, 30, 30]}
				receiveShadow
				castShadow
			/>
		</mesh>
	);
}

function Racket({
	RackRef,
}: {
	RackRef: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
}) {
	const ref = RackRef;
	const keyMap = useKeyboard();
	const long = 5;

	useFrame((_, delta) => {
		if (!ref.current) return;
		// if (keyMap.KeyA) ref.current.position.x -= 10 * delta;
		// if (keyMap.KeyD) ref.current.position.x += 10 * delta;
		if (keyMap.KeyW && ref.current.position.z > -5) {
			ref.current.position.z -= 10 * delta;
		} else if (keyMap.KeyS && ref.current.position.z < 5) {
			ref.current.position.z += 10 * delta;
		}
	});

	return (
		<mesh
			ref={ref}
			position={[-15, 2, 0]}
			onPointerDown={(e) => console.log(e.object.name)}
		>
			<boxGeometry args={[1, 1, long]} />
			<meshBasicMaterial color="red" />
		</mesh>
	);
}

export default function Game({ mode }: { mode: number }) {
	const BallRef = useRef<THREE.Mesh>(null);
	const Rack1Ref = useRef<THREE.Mesh>(null);
	// const Rack2Ref = useRef<THREE.Mesh>(null);
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
					args={[0.5, 0.5, 20]}
				/>
			</mesh>
			<mesh
				position={[0, 2, 10]}
				castShadow
				receiveShadow
				rotation={[0, Math.PI / 2, 0]}
			>
				<boxGeometry
					attach="geometry"
					args={[0.5, 0.5, 34]}
				/>
			</mesh>
			<mesh
				position={[0, 2, -10]}
				castShadow
				receiveShadow
				rotation={[0, Math.PI / 2, 0]}
			>
				<boxGeometry
					attach="geometry"
					args={[0.5, 0.5, 34]}
				/>
			</mesh>
			<Racket RackRef={Rack1Ref} />
			<Ball
				BallRef={BallRef}
				Rack1Ref={Rack1Ref}
			/>
			<mesh
				position={[-17, 2, 0]}
				castShadow
				receiveShadow
			>
				<boxGeometry
					attach="geometry"
					args={[0.5, 0.5, 20]}
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
