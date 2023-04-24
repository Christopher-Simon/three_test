import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThreeScene } from './hooks/useThreeScene';
import { useOrbitControls } from './hooks/useOrbitControls';
import Cube from './elements/Cube';
import TextDisplay from './elements/TextDisplay';

const ThreeScene: React.FC = () => {
  const { scene, camera, canvasRef } = useThreeScene();
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;
    }
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      const animate = () => {
        rendererRef.current?.render(scene.current, camera.current);
        window.requestAnimationFrame(animate);
      };

      animate();
    }
  }, [rendererRef]);

  useOrbitControls(camera.current, canvasRef.current);

  return (
    <>
      <canvas ref={canvasRef} />
      <Cube scene={scene.current} />
      <TextDisplay scene={scene.current} />
    </>
  );
};

export default ThreeScene;
