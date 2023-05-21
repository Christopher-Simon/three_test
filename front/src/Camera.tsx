import { OrbitControls } from "@react-three/drei";
import React, { RefObject, useRef, useState, Dispatch, useEffect } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import positions from "./positions.json";

function Camera({
	ref,
	mode,
	transition,
	orb,
}: {
	ref: RefObject<OrbitControlsImpl>;
	mode : number;
	transition: boolean;
	orb: number;
}) {
	if (mode !== 0 && transition === true) {
		return (
			<OrbitControls
				ref={ref}
				enablePan={false}
				autoRotate={false}
			/>
		);
	}
	return (
		<>
			{positions.map((pos) => (
				<>
					{pos.camera === orb && <OrbitControls 
						ref={ref}
						enablePan={pos.pan}
						autoRotate={pos.rotation}
						maxDistance={pos.maxdistance}
						minPolarAngle={pos.minpolar * Math.PI / 180}
						maxPolarAngle={pos.maxpolar * Math.PI / 180}
						enabled={pos.enabled}
					/>}
				</>
			))}
		</>
	);
}

export default Camera;