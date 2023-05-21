import React, { RefObject, useRef, useState, Dispatch, useEffect } from "react";
import { Vector3 } from "three";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
	BrowserRouter,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Annotation from "./Annotation";
import Profile from "./Profile";
import Game from "./Game";
import Camera from "./Camera";
import Stade from "./Stade";
import Chat from "./Chat";
import Nav from "./components/nav/Nav";
import GameMenu from "./GameMenu";
import Bottom from "./components/bottom/Bottom";
import positions from "./positions.json";
import "./App.css";

function Light() {
	const light = new THREE.DirectionalLight(0xffffff, 1);
	light.position.set(150, 350, 150);
	light.castShadow = true; // default false
	light.shadow.blurSamples = 4;
	light.shadow.mapSize.width = 5120; // default
	light.shadow.mapSize.height = 5120; // default
	light.shadow.camera.near = 0.1; // default
	light.shadow.camera.far = 500; // default
	light.shadow.camera.top = -100; // default
	light.shadow.camera.right = 100; // default
	light.shadow.camera.left = -100; // default
	light.shadow.camera.bottom = 100; // default
	light.intensity = 5;
	return <primitive object={light} />;
}

function Floor() {
	return (
		<mesh
			rotation-x={-Math.PI / 2}
			receiveShadow
			position={[0, 0, 0]}
		>
			<circleGeometry args={[150, 100, 100]} />
			<meshStandardMaterial />
		</mesh>
	);
}

function Animate({
	lerping,
	orbitRef,
	setLerping,
	setMode,
	setTransition,
	mode,
	setOrb,
}: {
	lerping: number;
	orbitRef: RefObject<OrbitControlsImpl>;
	setLerping: Dispatch<React.SetStateAction<number>>;
	setMode: Dispatch<React.SetStateAction<number>>;
	setTransition: Dispatch<React.SetStateAction<boolean>>;
	setOrb: Dispatch<React.SetStateAction<number>>;
	mode: number;
}) {
	let look = new Vector3(0, 0, 0);
	let vec = new Vector3(0, 0, 0);
	const [frame, setFrame] = useState<number>(0);
	return useFrame(({ camera }, delta) => {
		if (lerping === 0) return;
		positions.map((pos) => {
			if (pos.camera == lerping) {
				look.x = pos.target[0];
				look.y = pos.target[1];
				look.z = pos.target[2];
				vec.x = pos.position[0];
				vec.y = pos.position[1];
				vec.z = pos.position[2];
				if (mode === 1 && (lerping === 1 || lerping == 5 || lerping == 6))
				{
					orbitRef.current?.target.lerp(look, 1);
					camera.position.lerp(vec, 1);
					setOrb(lerping);
					setLerping(0);
					return;
				}
				setTransition(true);
				orbitRef.current?.target.lerp(look, delta * 1);
				camera.position.lerp(vec, delta * 1);
				if (frame < 10) setFrame(frame + 1);
				else {
					setFrame(0);
					if (lerping === 4 && camera.position.distanceTo(vec) < 10) {
						setMode(0);
						setOrb(0);
						setLerping(0);
						setTransition(false);
					} else if (lerping !== 0 && camera.position.distanceTo(vec) < 1) {
						setMode(lerping);
						setOrb(lerping);
						setTransition(false);
						setLerping(0);
					}
				}
			}
		});
	});
}

function Element1() {
	const [lerping, setLerping] = useState<number>(0);
	const [mode, setMode] = useState<number>(0);
	const [orb, setOrb] = useState<number>(0);
	const [transition, setTransition] = useState<boolean>(true);
	const orbitRef = useRef<OrbitControlsImpl>(null);
	const [GameMode, setGameMode] = useState<number>(1);

	const location = useLocation();
	useEffect(() => {
		console.log("location ", location);
		if (location.hash === "#leaderboard") setLerping(2);
		else if (location.hash === "#home") setLerping(4);
		else if (location.hash === "#profile") setLerping(3);
		else if (location.hash === "#game") setLerping(1);
		else setLerping(4);
	}, [location]);

	const [board, setboard] = useState<boolean>(false);

	return (
		<>
			<div className="Header">
				<Nav />
			</div>
			<Canvas
				shadows
				camera={{ position: [55, 55, -55] }}
				className="canvas"
				onPointerDown={() => {
					if (transition === true) return;
					setLerping(0);
				}}
				onWheel={() => {
					if (transition === true) return;
					setLerping(0);
				}}
			>
				{mode === 0 && <Annotation />}
				<ambientLight intensity={0.5} />
				<boxGeometry />
				<Light />
				<Stade />
				<Camera
					ref={orbitRef}
					mode={mode}
					transition={transition}
					orb={orb}
				/>
				{mode === 1 && <Game orbitRef={orbitRef} orb={orb} GameMode={GameMode} setGameMode={setGameMode}/>}
				<Animate
					lerping={lerping}
					orbitRef={orbitRef}
					setLerping={setLerping}
					setMode={setMode}
					setTransition={setTransition}
					mode={mode}
					setOrb={setOrb}
				/>
				<Floor />
				<Profile Board={board} />
				<axesHelper
					args={[10]}
					position={[0, 1.5, 0]}
				/>
				<gridHelper
					args={[30, 6]}
					position={[0, 1.2, 0]}
				/>
				<mesh position={[1, 2, 1]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshBasicMaterial color="green" />
				</mesh>
				<Stats />
			</Canvas>
			<div className="GameMenu">
				{mode === 1 && <GameMenu GameMode={GameMode} setGameMode={setGameMode}/>}
			</div>
			<div className="Bottom">
				<Bottom mode={mode} setLerping={setLerping} transition={transition}/>
			</div>
			<div className="Chat">
				<Chat />
			</div>
		</>
	);
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="*"
					element={<Element1 />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
