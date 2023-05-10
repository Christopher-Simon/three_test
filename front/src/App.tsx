import React, { RefObject, useRef, useState } from "react";
import {
	MeshBasicMaterial,
	MeshNormalMaterial,
	MeshPhongMaterial,
	MeshStandardMaterial,
	TextureLoader,
	Vector3,
} from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import Polyhedron from "./game/Polyhedron";
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
}: {
	lerping: boolean;
	orbitRef: RefObject<OrbitControlsImpl>;
}) {
	return useFrame(({ camera }, delta) => {
		if (!lerping) return;
		const look = new Vector3(0, 1, 5);
		orbitRef.current?.target.lerp(look, delta);
		const vec = new Vector3(10, 1, 5);
		camera.position.lerp(vec, delta * 1.5);
	});
}

function App() {
	const texture = useLoader(TextureLoader, "./img/grid.png");
	const stade = useLoader(OBJLoader, "/stade.obj");
	// const table = useLoader(OBJLoader, "/table.obj");
	const [lerping, setLerping] = useState<boolean>(false);
	const orbitRef = useRef<OrbitControlsImpl>(null);

	return (
		<Canvas
			shadows
			camera={{ position: [15, 10, -10] }}
			onPointerDown={() => setLerping(false)}
			onWheel={() => setLerping(false)}
		>
			<Annotation setLerping={setLerping} />
			<ambientLight intensity={0.2} />
			<directionalLight
				position={[25, 5, -14.4]}
				castShadow
				// rotation={[Math.PI / 2, 0, 0]}
			/>
			<mesh>
				<primitive
					object={stade}
					scale={0.2}
					position={[0, 0, 6]}
					rotation={[0, Math.PI / 2, 0]}
					children-0-castShadow
				/>
				{/* <primitive
					object={table}
					scale={0.005}
					position={[0, 0, 6]console.log("click")}
					rotation={[-Math.PI / 2, 0, 0]}
					children-0-castShadow
				/> */}
			</mesh>
			<Polyhedron
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
			/>
			<OrbitControls ref={orbitRef} />
			<Animate
				lerping={lerping}
				orbitRef={orbitRef}
			/>
			<Profile />
			<Floor />
			<axesHelper args={[5]} />
			<gridHelper />
			<Stats />
		</Canvas>
	);
}

export default App;
