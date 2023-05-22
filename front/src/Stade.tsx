// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
// import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Stade() {
	// const materials = useLoader(MTLLoader, "./src/stade.mtl");
	const stade = useGLTF("./src/stade.gltf");

	return (
		<mesh receiveShadow castShadow>
			<primitive
				object={stade.scene}
				scale={1}
				position={[0, 0, 0]}
				rotation={[0, 0, 0]}
				children-0-castShadow
				children-0-receiveShadow
			/>
		</mesh>
	);
}

export default Stade;
