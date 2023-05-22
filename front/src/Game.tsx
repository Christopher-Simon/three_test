import { useFrame } from "@react-three/fiber";
import { Html, Sphere } from "@react-three/drei";
import { useEffect, useRef, useState, Dispatch, RefObject } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
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

function HitRack(
	RackRef: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>,
	BallX: number,
	setBallX: Dispatch<React.SetStateAction<number>>,
	BallZ: number,
	setBallZ: Dispatch<React.SetStateAction<number>>,
	incrz: number,
	setincrz: Dispatch<React.SetStateAction<number>>,
	dir: number,
	setdir: Dispatch<React.SetStateAction<number>>,
	delta: number
) {
	const speed = 25;
	const rayon = 1;
	if (!RackRef.current) return;
	if (
		BallZ <= RackRef.current.position.z + 5 / 2 &&
		BallZ >= RackRef.current.position.z
	) {
		setBallX(BallX + speed * -dir * delta);
		setdir(-dir);
		setincrz(Math.abs(BallZ - RackRef.current.position.z));
		setBallZ(BallZ + speed * incrz * delta);
	} else if (
		BallZ >= RackRef.current.position.z - 5 / 2 &&
		BallZ < RackRef.current.position.z
	) {
		setBallX(BallX + speed * -dir * delta);
		setdir(-dir);
		setincrz(-Math.abs(RackRef.current.position.z - BallZ));
		setBallZ(BallZ + speed * incrz * delta);
	} else if (
		Math.abs(BallZ - (RackRef.current.position.z + 5 / 2)) < rayon ||
		Math.abs(BallZ - (RackRef.current.position.z - 5 / 2)) < rayon
	) {
		if (
			(RackRef.current.position.z - 5 / 2 - BallZ) ** 2 +
				(RackRef.current.position.x + 0.5 - BallX) ** 2 <=
			1
		) {
			setBallX(BallX + speed * -dir * delta);
			setdir(-dir);
			setincrz(-Math.abs(RackRef.current.position.z - BallZ));
			setBallZ(BallZ + speed * incrz * delta);
		} else if (
			(RackRef.current.position.z + 5 / 2 - BallZ) ** 2 +
				(RackRef.current.position.x + 0.5 - BallX) ** 2 <=
			1
		) {
			setBallX(BallX + speed * -dir * delta);
			setdir(-dir);
			setincrz(Math.abs(BallZ - RackRef.current.position.z));
			setBallZ(BallZ + speed * incrz * delta);
		} else {
			setBallX(BallX + speed * dir * delta);
			setBallZ(BallZ + speed * incrz * delta);
		}
	} else {
		setBallX(BallX + speed * dir * delta);
		setBallZ(BallZ + speed * incrz * delta);
	}
}

function Ball({
	BallRef,
	Rack1Ref,
	Rack2Ref,
	GameMode,
	setGameMode,
}: // setGameMode,
{
	BallRef: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
	Rack1Ref: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
	Rack2Ref: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
	GameMode: number;
	setGameMode: Dispatch<React.SetStateAction<number>>;
}) {
	const ref = BallRef;
	const [dir, setdir] = useState<number>(1);
	const rayon = 1;
	const speed = 25;
	const [incrz, setincrz] = useState<number>(0);
	const [BallX, setBallX] = useState<number>(0);
	const [BallZ, setBallZ] = useState<number>(0);
	useFrame((_, delta) => {
		// const delta = 1;
		if (
			!ref.current ||
			!Rack1Ref.current ||
			!Rack2Ref.current ||
			GameMode !== 4
		) {
			return;
		}
		setBallX(ref.current.position.x);
		setBallZ(ref.current.position.z);
		if (BallX + rayon + 0.1 >= 17 || BallX - rayon - 0.1 <= -17) {
			setdir(dir * -1);
			setincrz(0);
			setBallX(0);
			setBallZ(0);
			setGameMode(3);
		} else if (BallZ - rayon - 0.25 < -10 || BallZ + rayon + 0.25 > 10) {
			setBallZ(BallZ + -incrz * speed * delta);
			setBallX(BallX + speed * dir * delta);
			setincrz(-1 * incrz);
		} else if (BallX + rayon + 0.5 - 0.0001 > 15) {
			HitRack(
				Rack2Ref,
				BallX,
				setBallX,
				BallZ,
				setBallZ,
				incrz,
				setincrz,
				dir,
				setdir,
				delta
			);
		} else if (BallX - rayon - 0.5 - 0.0001 < -15) {
			HitRack(
				Rack1Ref,
				BallX,
				setBallX,
				BallZ,
				setBallZ,
				incrz,
				setincrz,
				dir,
				setdir,
				delta
			);
		} else {
			setBallX(BallX + speed * dir * delta);
			setBallZ(BallZ + speed * incrz * delta);
		}
		ref.current.position.x = BallX;
		ref.current.position.z = BallZ;
	});
	return (
		<mesh
			ref={ref}
			position={[0, 2, 0]} // 2
			receiveShadow
			castShadow
		>
			<Sphere args={[rayon, 30, 30]} receiveShadow castShadow />
		</mesh>
	);
}

function Racket({
	RackRef,
	position,
	move,
	orb,
	BallRef,
}: {
	RackRef: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
	position: [number, number, number];
	move: number;
	orb: number;
	BallRef: React.RefObject<Mesh<BufferGeometry, Material | Material[]>>;
}) {
	const ref = RackRef;
	const keyMap = useKeyboard();
	const long = 5;

	useFrame(({ camera }, delta) => {
		if (!ref.current) return;
		if (
			((move === 1 && keyMap.KeyW) || (move === 2 && keyMap.KeyO)) &&
			ref.current.position.z > -7.1
		) {
			ref.current.position.z -= 10 * delta;
		} else if (
			((move === 1 && keyMap.KeyS) || (move === 2 && keyMap.KeyL)) &&
			ref.current.position.z < 7.1
		) {
			ref.current.position.z += 10 * delta;
		} else if (move === 3 && BallRef.current) {
			ref.current.position.z =
				BallRef.current.position.z <= 0
					? Math.max(BallRef.current.position.z, -7.1)
					: Math.min(BallRef.current.position.z, 7.1);
		}
		if (orb === 6 && move === 1) {
			camera.position.z = ref.current.position.z;
		}
	});

	return (
		<mesh ref={ref} position={[position[0], position[1], position[2]]}>
			<boxGeometry args={[1, 1, long]} />
			<meshBasicMaterial color="red" />
		</mesh>
	);
}

function Validate({
	setGameMode,
}: {
	setGameMode: Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<Html position={[-15, 5, 0]}>
			<button type="button" onClick={() => setGameMode(3)}>
				ready?
			</button>
		</Html>
	);
}

export default function Game({
	orbitRef,
	orb,
	GameMode,
	setGameMode,
	opponent,
}: {
	orbitRef: RefObject<OrbitControlsImpl>;
	orb: number;
	GameMode: number;
	setGameMode: Dispatch<React.SetStateAction<number>>;
	opponent: string;
}) {
	const BallRef = useRef<THREE.Mesh>(null);
	const Rack1Ref = useRef<THREE.Mesh>(null);
	const Rack2Ref = useRef<THREE.Mesh>(null);

	// useEffect(() => {
	// 	if (GameMode > 1) setGameMode(0);
	// }, [document.location]);

	return (
		<mesh position={[0, 0, 0]} castShadow receiveShadow>
			{GameMode === 2 && <Validate setGameMode={setGameMode} />}
			<Frame />
			<Racket
				RackRef={Rack1Ref}
				position={[-15, 2, 0]}
				move={1}
				orb={orb}
				BallRef={BallRef}
			/>
			<Racket
				RackRef={Rack2Ref}
				position={[15, 2, 0]}
				move={opponent === "" ? 3 : 2}
				orb={orb}
				BallRef={BallRef}
			/>
			<Ball
				BallRef={BallRef}
				Rack1Ref={Rack1Ref}
				Rack2Ref={Rack2Ref}
				GameMode={GameMode}
				setGameMode={setGameMode}
			/>
		</mesh>
	);
}
