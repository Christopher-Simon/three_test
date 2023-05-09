import React from "react";
import {
	MeshBasicMaterial,
	MeshNormalMaterial,
	MeshPhongMaterial,
	MeshStandardMaterial,
} from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Polyhedron from "./game/Polyhedron";
import Lights from "./game/Lights";

function App() {
	return (
		<Canvas camera={{ position: [-1, 4, 2.5] }}>
			<Lights />
			<directionalLight position={[1, 1, 1]} />
			<Polyhedron
				name="meshBasicMaterial"
				position={[-3, 1, 0]}
				material={new MeshBasicMaterial({ color: "yellow" })}
			/>
			<Polyhedron
				name="meshNormalMaterial"
				position={[-1, 1, 0]}
				material={new MeshNormalMaterial({ flatShading: true })}
			/>
			<Polyhedron
				name="meshPhongMaterial"
				position={[1, 1, 0]}
				material={new MeshPhongMaterial({ color: "lime", flatShading: true })}
			/>
			<Polyhedron
				name="meshStandardMaterial"
				position={[3, 1, 0]}
				material={
					new MeshStandardMaterial({ color: "red", flatShading: true })
				}
			/>
			<OrbitControls target-y={1} />
			<axesHelper args={[5]} />
			<gridHelper />
			<Stats />
		</Canvas>
	);
}

export default App;
