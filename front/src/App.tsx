import React, { RefObject, useRef, useState, Dispatch } from "react";
import {
	// MeshBasicMaterial,
	// MeshNormalMaterial,
	// MeshPhongMaterial,
	// MeshStandardMaterial,
	// TextureLoader,
	Vector3,
} from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
// import Polyhedron from "./game/Polyhedron";
// import Lights from "./game/Lights";
import Annotation from "./Annotation";
import Profile from "./Profile";
import Buttons from "./Buttons";
import Game from "./Game";

// interface Peoplecamtype {
// 	// position: Vector3;
// 	// camera: Vector3;
// 	clic : number;
// 	setMyInt(value: number): void;
// }

function Floor() {
	return (
		<mesh
			rotation-x={-Math.PI / 2}
			receiveShadow
		>
			<circleGeometry args={[10]} />
			<meshStandardMaterial />
		</mesh>
	);
}

function Animate({
	lerping,
	orbitRef,
	setBoard,
	setLerping,
	// canvasRef,
}: {
	lerping: number;
	setBoard: Dispatch<React.SetStateAction<boolean>>;
	orbitRef: RefObject<OrbitControlsImpl>;
	setLerping: Dispatch<React.SetStateAction<number>>;
	// canvasRef: HTMLCanvasElement;
}) {
	// const { gl } = useThree<THREE.WebGLRenderer>();
	// const { invalidate } = useThree();
	// const meshRef = useRef<THREE.Mesh>(null);
	let peoplepos: [number, number, number] = [0, 0, 0];
	let peopleview: [number, number, number] = [0, 0, 0];
	if (lerping === 2) {
		peoplepos = [10, 1, 0];
		peopleview = [0, 1, 0];
	} else if (lerping === 1) {
		peoplepos = [0, 3, 5];
		peopleview = [0, 0, 0];
	} else if (lerping === 3) {
		peoplepos = [-10, 1, 0];
		peopleview = [0, 1, 0];
	} else if (lerping === 4) {
		peoplepos = [15, 15, -15];
		peopleview = [0, 0, 0];
	}
	const handleClick = () => {
		setTimeout(() => {
			console.log("Hello, world!");
			setLerping(0);
		}, 2000);
	};
	return useFrame(({ camera }, delta) => {
		if (lerping === 0) return;
		const look = new Vector3(peopleview[0], peopleview[1], peopleview[2]);
		orbitRef.current?.target.lerp(look, delta);
		const vec = new Vector3(peoplepos[0], peoplepos[1], peoplepos[2]);
		camera.position.lerp(vec, delta * 1.5);
		setBoard(true);
		if (lerping === 4) {
			handleClick();
		}

		// 	clearTimeout(timeoutId);
		// }
		// useEffect(() => {
		// 	const timer = setTimeout(() => {
		// 	  console.log('Timeout called!');
		// 	}, 1000);
		// 	return () => clearTimeout(timer);
		// }, []);
	});
}

function App() {
	// const texture = useLoader(TextureLoader, "./img/grid.png");
	const stade = useLoader(OBJLoader, "stade.obj");
	// const table = useLoader(OBJLoader, "/table.obj");
	const [lerping, setLerping] = useState<number>(0);
	const [board, setboard] = useState<boolean>(false);
	const orbitRef = useRef<OrbitControlsImpl>(null);

	return (
		<>
			<Canvas
				// ref={canvasRef}
				// frameloop="demand"
				shadows
				camera={{ position: [15, 15, -15] }}
				// onPointerDown={() => setLerping(0)}
				// onWheel={() => setLerping(0)}
			>
				<Annotation
					lerping={lerping}
					setLerping={setLerping}
				/>
				<ambientLight intensity={0.2} />
				<boxGeometry />
				<directionalLight
					position={[25, 5, -14.4]}
					castShadow
					// rotation={[Math.PI / 2, 0, 0]}
				/>
				<mesh>
					<primitive
						object={stade}
						scale={0.2}
						position={[0, 0, 0]}
						rotation={[0, Math.PI / 2, 0]}
						children-0-castShadow
					/>
				</mesh>
				{/* <Polyhedron
					name="meshBasicMaterial"
					position={[-3, 1, -5]}
					material={new MeshBasicMaterial({ map: texture })}
				/>
				<Polyhedron
					name="meshNormalMaterial"
					position={[-1, 1, -5]}
					material={new MeshNormalMaterial({ flatShading: true })}
				/>
				<Polyhedron
					name="meshPhongMaterial"
					position={[1, 1, -5]}
					material={
						new MeshPhongMaterial({
							color: "lime",
							map: texture,
							flatShading: true,
						})
					}
				/>
				<Polyhedron
					name="meshStandardMaterial"
					position={[3, 1, -5]}
					material={
						new MeshStandardMaterial({
							color: "red",
							map: texture,
							flatShading: true,
						})
					}
				/> */}
				<OrbitControls ref={orbitRef} />
				<Animate
					lerping={lerping}
					orbitRef={orbitRef}
					setBoard={setboard}
					setLerping={setLerping}
					// canvasRef={canvasRef}
				/>
				<Game />
				<Profile Board={board} />
				<Floor />
				<axesHelper args={[5]} />
				<gridHelper />
				<Stats />
			</Canvas>
			<Buttons
				lerping={lerping}
				setLerping={setLerping}
			/>
		</>
	);
}

export default App;
