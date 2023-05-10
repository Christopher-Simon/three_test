import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Material, Mesh } from "three";

interface PolyhedronProps {
	name: string;
	position: [number, number, number];
	material: Material;
}

export default function Polyhedron({
	name,
	position,
	material,
}: PolyhedronProps) {
	const instanceRef = useRef<Mesh>(null);
	const [rotate, setRotate] = useState<boolean>(true);

	useFrame((_, delta) => {
		if (!instanceRef.current) return;
		if (!rotate) return;
		instanceRef.current.rotation.x += 1 * delta;
		instanceRef.current.rotation.y += 0.5 * delta;
	});

	// useControls(name, {
	// 	wireframe: {
	// 		value: false,
	// 		onChange: (v) => {
	// 			if (
	// 				instanceRef.current &&
	// 				instanceRef.current.material instanceof Material &&
	// 				hasWireframe(instanceRef.current.material)
	// 			) {
	// 				instanceRef.current.material.wireframe = v;
	// 			}
	// 		},
	// 	},
	// 	flatShading: {
	// 		value: true,
	// 		onChange: (v) => {
	// 			if (
	// 				instanceRef.current &&
	// 				instanceRef.current.material instanceof Material &&
	// 				hasFlatShading(instanceRef.current.material)
	// 			) {
	// 				instanceRef.current.material.flatShading = v;
	// 				instanceRef.current.material.needsUpdate = true;
	// 			}
	// 		},
	// 	},
	// 	color: {
	// 		value: "lime",
	// 		onChange: (v) => {
	// 			if (
	// 				instanceRef.current &&
	// 				instanceRef.current.material instanceof Material &&
	// 				hasColor(instanceRef.current.material)
	// 			) {
	// 				instanceRef.current.material.color = new Color(v);
	// 			}
	// 		},
	// 	},
	// });

	return (
		<mesh
			{...{ name, position, material }}
			ref={instanceRef}
			onPointerDown={() => {
				setRotate(!rotate);
			}}
			castShadow
			receiveShadow
		>
			<icosahedronGeometry args={[1, 1]} />
		</mesh>
	);
}
