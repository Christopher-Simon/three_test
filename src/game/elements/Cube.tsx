import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CubeProps {
  scene: THREE.Scene;
}

const Cube: React.FC<CubeProps> = ({ scene }) => {
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    cubeRef.current = cube;

    return () => {
      scene.remove(cube);
    };
  }, [scene]);

  useEffect(() => {
    const animate = () => {
      if (cubeRef.current) {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;
      }

      window.requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return null;
};

export default Cube;