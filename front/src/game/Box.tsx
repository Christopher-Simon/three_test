import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

interface BoxProps {
	position: [number, number, number];
	name: string;
}

export default function Box(props: BoxProps) {
	const instanceRef = useRef<Mesh>(null);
	const [hovered, setHover] = useState<boolean>(false);
	const [rotate, setRotate] = useState<boolean>(false);

	useFrame((_, delta) => {
		if (!instanceRef.current) return;
		if (!rotate) return;
		instanceRef.current.rotation.x += 1 * delta;
		instanceRef.current.rotation.y += 0.5 * delta;
	});

	return (
		<mesh
			{...props}
			ref={instanceRef}
			scale={hovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
			onPointerDown={() => {
				setRotate(!rotate);
				console.log("click");
			}}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<boxGeometry />
			<boxGeometry />
			<meshBasicMaterial
				color={hovered ? 0xff0000 : 0x00ff00}
				wireframe
			/>
		</mesh>
	);
}
