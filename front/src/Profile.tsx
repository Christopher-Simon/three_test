import { Html } from "@react-three/drei";
import React from "react";

export default function Profile() {
	return (
		<Html
			position={[7, 1, 5]}
			rotation={[0, Math.PI / 2, 0]}
			transform
		>
			<div
				style={{
					backgroundColor: "grey",
					borderRadius: "5px",
					padding: "10px",
					textAlign: "center",
				}}
			>
				<p style={{ fontSize: "20px" }}>Profile</p>
			</div>
		</Html>
	);
}
