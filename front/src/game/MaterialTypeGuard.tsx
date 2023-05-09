import {
	Material,
	MeshBasicMaterial,
	MeshPhongMaterial,
	MeshStandardMaterial,
	MeshLambertMaterial,
	MeshNormalMaterial,
} from "three";

export function hasColor(
	material: Material
): material is MeshBasicMaterial | MeshPhongMaterial | MeshStandardMaterial {
	return (
		material instanceof MeshBasicMaterial ||
		material instanceof MeshPhongMaterial ||
		material instanceof MeshStandardMaterial
	);
}

export function hasWireframe(
	material: Material
): material is
	| MeshNormalMaterial
	| MeshStandardMaterial
	| MeshBasicMaterial
	| MeshPhongMaterial
	| MeshLambertMaterial {
	return (
		material instanceof MeshStandardMaterial ||
		material instanceof MeshBasicMaterial ||
		material instanceof MeshPhongMaterial ||
		material instanceof MeshLambertMaterial ||
		material instanceof MeshNormalMaterial
	);
}

export function hasFlatShading(
	material: Material
): material is
	| MeshStandardMaterial
	| MeshPhongMaterial
	| MeshLambertMaterial
	| MeshNormalMaterial {
	return (
		material instanceof MeshStandardMaterial ||
		material instanceof MeshPhongMaterial ||
		material instanceof MeshLambertMaterial ||
		material instanceof MeshNormalMaterial
	);
}
