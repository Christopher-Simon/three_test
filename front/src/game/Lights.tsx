import React, { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";

export default function Lights() {
	const ambientRef = useRef<THREE.AmbientLight>(null);
	const pointRef = useRef<THREE.PointLight>(null);
	const spotRef = useRef<THREE.SpotLight>(null);

	useControls("Ambient Light", {
		visible: {
			value: false,
			onChange: (v) => {
				if (ambientRef.current) ambientRef.current.visible = v;
			},
		},
		color: {
			value: "white",
			onChange: (v) => {
				if (ambientRef.current) ambientRef.current.color = new THREE.Color(v);
			},
		},
	});

	const directionalRef = useRef<THREE.DirectionalLight>(null);

	useControls("Directional Light", {
		visible: {
			value: true,
			onChange: (v: boolean) => {
				if (directionalRef.current) {
					directionalRef.current.visible = v;
				}
			},
		},
		position: {
			value: { x: 1, y: 1, z: 1 },
			onChange: (v: THREE.Vector3) => {
				if (directionalRef.current) {
					directionalRef.current.position.copy(v);
				}
			},
		},
		color: {
			value: "white",
			onChange: (v: string) => {
				if (directionalRef.current) {
					directionalRef.current.color = new THREE.Color(v);
				}
			},
		},
	});

	useControls("Point Light", {
		visible: {
			value: false,
			onChange: (v: boolean) => {
				if (pointRef.current) {
					pointRef.current.visible = v;
				}
			},
		},
		position: {
			value: {
				x: 2,
				y: 0,
				z: 0,
			},
			onChange: (v: THREE.Vector3) => {
				if (pointRef.current) {
					pointRef.current.position.copy(v);
				}
			},
		},
		color: {
			value: "white",
			onChange: (v: string) => {
				if (pointRef.current) {
					pointRef.current.color = new THREE.Color(v);
				}
			},
		},
	});

	useControls("Spot Light", {
		visible: {
			value: false,
			onChange: (v) => {
				if (spotRef.current) {
					spotRef.current.visible = v;
				}
			},
		},
		position: {
			value: {
				x: 3,
				y: 2.5,
				z: 1,
			},
			onChange: (v) => {
				if (spotRef.current) {
					spotRef.current.position.copy(v);
				}
			},
		},
		color: {
			value: "white",
			onChange: (v) => {
				if (spotRef.current) {
					spotRef.current.color = new THREE.Color(v);
				}
			},
		},
	});

	return (
		<>
			<ambientLight ref={ambientRef} />
			<directionalLight ref={directionalRef} />
			<pointLight ref={pointRef} />
			<spotLight ref={spotRef} />
		</>
	);
}
