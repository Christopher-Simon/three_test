import React, { Dispatch } from "react";

function SetPlayer(
{
	setGameMode,
} : {
	setGameMode: Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<div className="GameMenu">
			<h1>Choisissez votre adversaire</h1>
			<div onClick={() => setGameMode(2)}>Player</div>
			<div onClick={() => setGameMode(2)}>Computer</div>
		</div>
	);
}

function GameMenu(
{
	GameMode,
	setGameMode,
} : {
	GameMode: number;
	setGameMode: Dispatch<React.SetStateAction<number>>;
}) {
	// add the hook state for the computer player
	// add the countdown
	return (
		<>
			{GameMode === 1 && <SetPlayer setGameMode={setGameMode}/>}
			{GameMode === 2 && <div onClick={() => setGameMode(2)}>Game</div>}
		</>
	);
}

export default GameMenu;