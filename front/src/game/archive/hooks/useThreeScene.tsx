import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const useThreeScene = () => {
  const scene = useRef(new THREE.Scene());
  const camera = useRef(new THREE.PerspectiveCamera(75, (window.innerWidth - 4)  / (window.innerHeight - 4) , 0.1, 1000));
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    camera.current.position.z = 10;
  }, []);

  return { scene, camera, canvasRef };
};
