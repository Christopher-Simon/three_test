import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useLoader } from "@react-three/fiber";

function Stade() {

	const materials = useLoader(MTLLoader, "./src/stade.mtl");
	const stade = useLoader(OBJLoader, "./src/stade.obj", (object) => {
		object.setMaterials(materials);
		console.log(object);
	});

	return (
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
			/>
		</mesh>
	);
}

export default Stade;