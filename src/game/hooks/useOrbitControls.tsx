import { OrbitControls } from 'three-orbitcontrols-ts';
import { useEffect } from 'react';
import * as THREE from 'three';

export const useOrbitControls = (camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement | null) => {
  useEffect(() => {
    if (canvas) {
      const controls = new OrbitControls(camera, canvas);
      return () => {
        controls.dispose();
      };
    }
  }, [camera, canvas]);
};
