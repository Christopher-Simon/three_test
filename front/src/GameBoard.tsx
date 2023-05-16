export default function Frame() {
	return (
		<>
			<mesh
				position={[17, 2, 0]}
				castShadow
				receiveShadow
			>
				<boxGeometry
					attach="geometry"
					args={[0.5, 0.5, 20]}
				/>
			</mesh>
			<mesh
				position={[0, 2, 10]}
				castShadow
				receiveShadow
				rotation={[0, Math.PI / 2, 0]}
			>
				<boxGeometry
					attach="geometry"
					args={[0.5, 0.5, 34]}
				/>
			</mesh>
			<mesh
				position={[0, 2, -10]}
				castShadow
				receiveShadow
				rotation={[0, Math.PI / 2, 0]}
			>
				<boxGeometry
					attach="geometry"
					args={[0.5, 0.5, 34]}
				/>
			</mesh>
			<mesh
				position={[-17, 2, 0]}
				castShadow
				receiveShadow
			>
				<boxGeometry
					attach="geometry"
					args={[0.5, 0.5, 20]}
				/>
			</mesh>
		</>
	);
}
