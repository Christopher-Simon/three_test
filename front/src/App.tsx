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
import { Geometry, OrbitControls as OrbitControlsImpl } from "three-stdlib";
// import Polyhedron from "./game/Polyhedron";
// import Lights from "./game/Lights";
import Annotation from "./Annotation";
import Profile from "./Profile";

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
	// canvasRef,
}: {
	lerping: boolean;
	setBoard: Dispatch<React.SetStateAction<boolean>>;
	orbitRef: RefObject<OrbitControlsImpl>;
	// canvasRef: HTMLCanvasElement;
}) {
	// const { gl } = useThree<THREE.WebGLRenderer>();
	// const { invalidate } = useThree();
	// const meshRef = useRef<THREE.Mesh>(null);
	return useFrame(({ camera }, delta) => {
		if (!lerping) return;
		const look = new Vector3(0, 1, 5);
		orbitRef.current?.target.lerp(look, delta);
		const vec = new Vector3(10, 1, 5);
		camera.position.lerp(vec, delta * 1.5);
		setBoard(true);
		// if (canvasRef.current) {
		// 	canvasRef.current.invalidate();
		// }
		// gl.renderLists.dispose();
		// gl.invalidate();
		// meshRef.current?.parent?.invalidate();
	});
}

function App() {
	// const texture = useLoader(TextureLoader, "./img/grid.png");
	const stade = useLoader(OBJLoader, "stade.obj");
	// const table = useLoader(OBJLoader, "/table.obj");
	const [lerping, setLerping] = useState<boolean>(false);
	const [board, setboard] = useState<boolean>(false);
	const orbitRef = useRef<OrbitControlsImpl>(null);
	// const canvasRef = useRef<typeof Canvas>(null);

	return (
		<Canvas
			// ref={canvasRef}
			// frameloop="demand"
			shadows
			camera={{ position: [15, 15, -15] }}
			onPointerDown={() => setLerping(false)}
			onWheel={() => setLerping(false)}
		>
			<Annotation setLerping={setLerping} setBoard={setboard} />
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
			<mesh position={[3, 0, 0]}>
				<boxGeometry attach="geometry" />
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
				// canvasRef={canvasRef}
			/>
			<Profile Board={board} />
			<Floor />
			<axesHelper args={[5]} />
			<gridHelper />
			<Stats />
		</Canvas>
	);
}

export default App;
