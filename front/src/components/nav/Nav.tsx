// import React from "react";
import Button from "../button/Button";

export default function Nav() {
	return (
		<nav>
			<div>
				<img alt="img" />
				<h1>Ronan Garros</h1>
			</div>
			<div>
				<Button format="primary">Se connecter</Button>
				<Button format="primary">S'inscrire</Button>
			</div>
		</nav>
	);
}
