import React, { Dispatch, useState, useEffect } from "react";
import "./GameMenu.css";
// import Game from "./Game";

function SetPlayer({
	setGameMode,
	setOpponent,
}: {
	setGameMode: Dispatch<React.SetStateAction<number>>;
	setOpponent: Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<div className="GameMenu">
			<h1>Choisissez votre adversaire</h1>
			<div className="options">
				<div
					role="button"
					tabIndex={0}
					className="brick"
					onClick={() => {
						setGameMode(2);
						setOpponent("lambda");
					}}
					onKeyDown={() => {}}
				>
					Player
				</div>
				<div
					className="brick"
					onClick={() => setGameMode(2)}
					role="button"
					tabIndex={0}
					onKeyDown={() => {}}
				>
					Computer
				</div>
			</div>
		</div>
	);
}

function Countdown({
	GameMode,
	setGameMode,
}: {
	GameMode : number;
	setGameMode: Dispatch<React.SetStateAction<number>>;
}) {
	const [count, setCount] = useState<number>(3);

	useEffect(() => {
		if (GameMode === 3) {
			if (count === 0) setGameMode(4);
			setTimeout(() => {
				setCount(count - 1);
			}, 2000);
		}
	}, [count, GameMode, setGameMode]);
	return <div className="countdown">{count}</div>;
}

function GameMenu({
	GameMode,
	setGameMode,
	setOpponent,
}: {
	GameMode: number;
	setGameMode: Dispatch<React.SetStateAction<number>>;
	setOpponent: Dispatch<React.SetStateAction<string>>;
}) {
	// add the hook state for the computer player
	return (
		<>
			{GameMode === 1 && (
				<SetPlayer setGameMode={setGameMode} setOpponent={setOpponent} />
			)}
			{GameMode === 3 && <Countdown GameMode={GameMode} setGameMode={setGameMode} />}
		</>
	);
}

export default GameMenu;
