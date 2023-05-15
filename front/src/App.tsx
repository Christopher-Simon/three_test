import React, { RefObject, useRef, useState, Dispatch } from "react";
import {
	// BasicShadowMap,
	// MeshBasicMaterial,
	// MeshNormalMaterial,
	// MeshPhongMaterial,
	// MeshStandardMaterial,
	// TextureLoader,
	Vector3,
} from "three";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
// import Polyhedron from "./game/Polyhedron";
// import Lights from "./game/Lights";
import Annotation from "./Annotation";
import Profile from "./Profile";
import Buttons from "./Buttons";
import Game from "./Game";

// import metal from "./download.jpg";

// interface Peoplecamtype {
// 	// position: Vector3;
// 	// camera: Vector3;
// 	clic : number;
// 	setMyInt(value: number): void;
// }

function Light() {
	// Create a PointLight and turn on shadows for the light
	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(150, 350, 150);
	light.castShadow = true; // default false
	light.shadow.blurSamples = 4;
	// Set up shadow properties for the light
	light.shadow.mapSize.width = 5120; // default
	light.shadow.mapSize.height = 5120; // default
	light.shadow.camera.near = 0.1; // default
	light.shadow.camera.far = 500; // default
	light.shadow.camera.top = -100; // default
	light.shadow.camera.right = 100; // default
	light.shadow.camera.left = -100; // default
	light.shadow.camera.bottom = 100; // default
	light.intensity = 5;
	return <primitive object={light} />;
}

function Floor() {
	return (
		<mesh
			rotation-x={-Math.PI / 2}
			receiveShadow
			position={[0, 0, 0]}
		>
			<circleGeometry args={[150, 100, 100]} />
			{/* <planeGeometry args={[2500, 1500]} /> */}
			<meshStandardMaterial />
		</mesh>
	);
}

function Animate({
	lerping,
	orbitRef,
	setBoard,
	setLerping,
	setMode,
}: // canvasRef,
{
	lerping: number;
	setBoard: Dispatch<React.SetStateAction<boolean>>;
	orbitRef: RefObject<OrbitControlsImpl>;
	setLerping: Dispatch<React.SetStateAction<number>>;
	setMode: Dispatch<React.SetStateAction<number>>;
	// canvasRef: HTMLCanvasElement;
}) {
	// const { gl } = useThree<THREE.WebGLRenderer>();
	// const { invalidate } = useThree();
	// const meshRef = useRef<THREE.Mesh>(null);
	let peoplepos: [number, number, number] = [0, 0, 0];
	let peopleview: [number, number, number] = [0, 0, 0];
	if (lerping === 2) {
		peoplepos = [50, 1, 0];
		peopleview = [0, 1, 0];
	} else if (lerping === 1) {
		peoplepos = [0, 7, 15];
		peopleview = [0, 0, 0];
	} else if (lerping === 3) {
		peoplepos = [-10, 1, 0];
		peopleview = [0, 1, 0];
	} else if (lerping === 4) {
		peoplepos = [55, 55, -55];
		peopleview = [0, 0, 0];
	}
	const handleClick = () => {
		setTimeout(() => {
			setLerping(0);
			setMode(0);
		}, 2000);
	};
	return useFrame(({ camera }, delta) => {
		if (lerping === 0) return;
		const look = new Vector3(peopleview[0], peopleview[1], peopleview[2]);
		orbitRef.current?.target.lerp(look, delta);
		const vec = new Vector3(peoplepos[0], peoplepos[1], peoplepos[2]);
		camera.position.lerp(vec, delta * 1.5);
		setBoard(true);
		setMode(lerping);
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
	// const texture = useLoader(TextureLoader, "../public/stade.mtl");
	const materials = useLoader(MTLLoader, "../public/stade.mtl");
	// const texture = useTexture("../public/stade.mtl");
	// const base = new THREE.TextureLoader().load(metal);
	// materials.loadTexture;
	const stade = useLoader(OBJLoader, "stade.obj", (object) => {
		object.setMaterials(materials);
		console.log(object);
	});
	// const stade = useLoader(GLTFLoader, "../public/stade.gltf");
	// stade.materials =
	// const table = useLoader(OBJLoader, "/table.obj");
	// const stade = useLoader(OBJLoader, "stade.obj", (loader) => {
	// 	materials.preload();
	// 	loader.setMaterials(materials);
	// });
	// const { nodes, materials } = useGraph(stade);

	const [lerping, setLerping] = useState<number>(0);
	const [board, setboard] = useState<boolean>(false);
	const [mode, setMode] = useState<number>(0);
	// 0 = accueil
	// 1 = jeu
	// 2 = autre
	const orbitRef = useRef<OrbitControlsImpl>(null);
	// const { camera, gl } = useThree();
	// useFrame(() => {
	// 	camera.position.set(0, 0, 5);
	// 	gl.render(stade, camera);
	// });

	return (
		<>
			<Canvas
				// ref={canvasRef}
				// frameloop="demand"
				shadows
				camera={{ position: [55, 55, -55] }}
				onPointerDown={() => setLerping(0)}
				onWheel={() => setLerping(0)}
			>
				<Annotation
					mode={mode}
					setLerping={setLerping}
				/>
				<ambientLight intensity={0.5} />
				<boxGeometry />
				{/* <directionalLight
					position={[0, 100, 0]}
					castShadow
				/> */}
				<Light />
				<mesh
					receiveShadow
					castShadow
				>
					<primitive
						object={stade}
						scale={1}
						position={[0, 0, 0]}
						rotation={[0, Math.PI / 2, 0]}
						children-0-castShadow
						children-0-receiveShadow
						// map={materials}
					/>
					{/* <meshBasicMaterial
						attach="material"
						color="lightblue"
						transparent
					/> */}
				</mesh>
				<Game mode={mode} />
				<OrbitControls ref={orbitRef} />
				<Animate
					lerping={lerping}
					orbitRef={orbitRef}
					setBoard={setboard}
					setLerping={setLerping}
					setMode={setMode}
					// canvasRef={canvasRef}
				/>
				<Floor />
				{/* <ContactShadows
					scale={150}
					position={[0.33, -0.33, 0.33]}
					opacity={1.5}
				/> */}
				<Profile Board={board} />
				<axesHelper
					args={[10]}
					position={[0, 1.5, 0]}
				/>
				<gridHelper
					args={[30, 6]}
					position={[0, 1.2, 0]}
				/>
				<mesh position={[1, 2, 1]}>
					<boxGeometry
						args={[1, 1, 1]}
					/>
					<meshBasicMaterial color="green" />
				</mesh>
				<Stats />
			</Canvas>
			<Buttons
				mode={mode}
				setLerping={setLerping}
				// setMode={setMode}
			/>
		</>
	);
}

export default App;
