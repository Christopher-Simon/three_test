import { useFrame } from "@react-three/fiber";
import { Html, Sphere } from "@react-three/drei";
import { useEffect, useRef, useState, Dispatch } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import Frame from "./GameBoard";

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

// function HitRack({
// 	RackRef,
// 	BallRef,
// }: {
// 	RackRef: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
// }) {}

function Ball({
	BallRef,
	Rack1Ref,
	Rack2Ref,
	GameMode,
}: // setGameMode,
{
	BallRef: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
	Rack1Ref: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
	Rack2Ref: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
	GameMode: number;
	// setGameMode: Dispatch<React.SetStateAction<number>>;
}) {
	const ref = BallRef;
	let dir = 1;
	const rayon = 1;
	const speed = 0.3;
	let incrz = 0;
	useFrame(() => {
		if (!ref.current) return;
		if (!Rack1Ref.current) return;
		if (!Rack2Ref.current) return;
		if (GameMode === 0 || GameMode === 1) return;
		if (
			ref.current.position.x + rayon + 0.1 >= 17 ||
			ref.current.position.x - rayon - 0.1 <= -17
		) {
			dir *= -1;
			incrz = 0;
			ref.current.position.x = 0;
			ref.current.position.z = 0;
			// setTimeout(() => {
			// 	if (!ref.current) return;
			// 	dir *= -1;
			// 	incrz = 0;
			// 	ref.current.position.x = 0;
			// 	ref.current.position.z = 0;
			// }, 2000);
			// } else {
			// 	ref.current.position.x += speed * dir;
			// ref.current.position.z = ref.current.position.z;
		} else if (
			ref.current.position.z - rayon - 0.25 < -10 ||
			ref.current.position.z + rayon + 0.25 > 10
		) {
			// rebond sur les cotes
			incrz *= -1;
			ref.current.position.z += incrz;
			ref.current.position.x += speed * dir;
		} else if (ref.current.position.x + rayon + 0.5 - 0.0001 > 15) {
			if (
				ref.current.position.z <= Rack2Ref.current.position.z + 5 / 2 &&
				ref.current.position.z >= Rack2Ref.current.position.z
			) {
				dir *= -1;
				ref.current.position.x += speed * dir;
				incrz = Math.abs(ref.current.position.z - Rack2Ref.current.position.z);
				ref.current.position.z += speed * incrz;
			} else if (
				ref.current.position.z >= Rack2Ref.current.position.z - 5 / 2 &&
				ref.current.position.z < Rack2Ref.current.position.z
			) {
				dir *= -1;
				ref.current.position.x += speed * dir;
				incrz = -Math.abs(Rack2Ref.current.position.z - ref.current.position.z);
				ref.current.position.z += speed * incrz;
			} else if (
				Math.abs(
					ref.current.position.z - (Rack2Ref.current.position.z + 5 / 2)
				) < rayon ||
				Math.abs(
					ref.current.position.z - (Rack2Ref.current.position.z - 5 / 2)
				) < rayon
			) {
				if (
					(Rack2Ref.current.position.z - 5 / 2 - ref.current.position.z) ** 2 +
						(Rack2Ref.current.position.x + 0.5 - ref.current.position.x) ** 2 <=
					1
				) {
					dir *= -1;
					ref.current.position.x += speed * dir;
					incrz = -Math.abs(
						Rack2Ref.current.position.z - ref.current.position.z
					);
					ref.current.position.z += speed * incrz;
				} else if (
					(Rack2Ref.current.position.z + 5 / 2 - ref.current.position.z) ** 2 +
						(Rack2Ref.current.position.x + 0.5 - ref.current.position.x) ** 2 <=
					1
				) {
					dir *= -1;
					ref.current.position.x += speed * dir;
					incrz = Math.abs(
						ref.current.position.z - Rack2Ref.current.position.z
					);
					ref.current.position.z += speed * incrz;
					// incrz = 0.5 * ref.current.position.x * (2 / 5);
					// ref.current.position.z += speed * incrz;
				} else {
					ref.current.position.x += speed * dir;
					ref.current.position.z += speed * incrz;
				}
				// dir *= -1;
				// ref.current.position.x += speed * dir;
			} else {
				ref.current.position.x += speed * dir;
				ref.current.position.z += speed * incrz;
			}
		} else if (ref.current.position.x - rayon - 0.5 - 0.0001 < -15) {
			if (
				ref.current.position.z <= Rack1Ref.current.position.z + 5 / 2 &&
				ref.current.position.z >= Rack1Ref.current.position.z
			) {
				dir *= -1;
				ref.current.position.x += speed * dir;
				incrz = Math.abs(ref.current.position.z - Rack1Ref.current.position.z);
				ref.current.position.z += speed * incrz;
			} else if (
				ref.current.position.z >= Rack1Ref.current.position.z - 5 / 2 &&
				ref.current.position.z < Rack1Ref.current.position.z
			) {
				dir *= -1;
				ref.current.position.x += speed * dir;
				incrz = -Math.abs(Rack1Ref.current.position.z - ref.current.position.z);
				ref.current.position.z += speed * incrz;
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
					1
				) {
					dir *= -1;
					ref.current.position.x += speed * dir;
					incrz = -Math.abs(
						Rack1Ref.current.position.z - ref.current.position.z
					);
					ref.current.position.z += speed * incrz;
				} else if (
					(Rack1Ref.current.position.z + 5 / 2 - ref.current.position.z) ** 2 +
						(Rack1Ref.current.position.x + 0.5 - ref.current.position.x) ** 2 <=
					1
				) {
					dir *= -1;
					ref.current.position.x += speed * dir;
					incrz = Math.abs(
						ref.current.position.z - Rack1Ref.current.position.z
					);
					ref.current.position.z += speed * incrz;
					// incrz = 0.5 * ref.current.position.x * (2 / 5);
					// ref.current.position.z += speed * incrz;
				} else {
					ref.current.position.x += speed * dir;
					ref.current.position.z += speed * incrz;
				}
				// dir *= -1;
				// ref.current.position.x += speed * dir;
			} else {
				ref.current.position.x += speed * dir;
				ref.current.position.z += speed * incrz;
			}
		} else {
			ref.current.position.x += speed * dir;
			ref.current.position.z += speed * incrz;
		}
	});
	return (
		<mesh
			ref={ref}
			position={[0, 2, 0]} // 2
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
	position,
	move,
}: {
	RackRef: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
	position: [number, number, number];
	move: number;
}) {
	const ref = RackRef;
	const keyMap = useKeyboard();
	const long = 5;

	useFrame((_, delta) => {
		if (!ref.current) return;
		if (
			((move === 1 && keyMap.KeyW) || (move === 2 && keyMap.KeyO)) &&
			ref.current.position.z > -5
		) {
			ref.current.position.z -= 10 * delta;
		} else if (
			((move === 1 && keyMap.KeyS) || (move === 2 && keyMap.KeyL)) &&
			ref.current.position.z < 5
		) {
			ref.current.position.z += 10 * delta;
		}
	});

	return (
		<mesh
			ref={ref}
			position={[position[0], position[1], position[2]]}
		>
			<boxGeometry args={[1, 1, long]} />
			<meshBasicMaterial color="red" />
		</mesh>
	);
}

function Validate({
	GameMode,
	setGameMode,
}: {
	GameMode: number;
	setGameMode: Dispatch<React.SetStateAction<number>>;
}) {
	if (GameMode === 0 || GameMode === 2 || GameMode === 3) {
		return <mesh />;
	}
	return (
		<Html position={[-15, 5, 0]}>
			<button
				type="button"
				onClick={() => setGameMode(2)}
			>
				ready?
			</button>
		</Html>
	);
}

// function printscreen({ i }: { i: number }) {
// 	return (
// 		<Html position={[0, 5, 0]}>
// 			<p>{i}</p>
// 		</Html>
// 	);
// }

// function Countdown({
// 	GameMode,
// 	setGameMode,
// }: {
// 	GameMode: number;
// 	setGameMode: Dispatch<React.SetStateAction<number>>;
// }) {
// 	if (GameMode !== 3) {
// 		return <mesh />;
// 	}
// 	for (let i = 3; i >= 1; i -= 1) {
// 		setTimeout(() => {
// 			printscreen({ i });
// 			setGameMode(2);
// 		}, 4000);
// 	}
// 	return <mesh />;
// }

export default function Game() {
	const BallRef = useRef<THREE.Mesh>(null);
	const Rack1Ref = useRef<THREE.Mesh>(null);
	const Rack2Ref = useRef<THREE.Mesh>(null);
	const [GameMode, setGameMode] = useState<number>(0);

	useEffect(() => {
		if (GameMode === 0) {
			setTimeout(() => {
				setGameMode(1);
			}, 8500);
		}
	}, [GameMode]);
	return (
		<mesh
			position={[0, 0, 0]}
			castShadow
			receiveShadow
		>
			<Validate
				GameMode={GameMode}
				setGameMode={setGameMode}
			/>
			{/* <Countdown
				GameMode={GameMode}
				setGameMode={setGameMode}
			/> */}
			<Frame />
			<Racket
				RackRef={Rack1Ref}
				position={[-15, 2, 0]}
				move={1}
			/>
			<Racket
				RackRef={Rack2Ref}
				position={[15, 2, 0]}
				move={2}
			/>
			<Ball
				BallRef={BallRef}
				Rack1Ref={Rack1Ref}
				Rack2Ref={Rack2Ref}
				GameMode={GameMode}
				// setGameMode={setGameMode}
			/>
		</mesh>
	);
}
