import { useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

interface TextDisplayProps {
  scene: THREE.Scene;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ scene }) => {
  useEffect(() => {
    const fontLoader = new FontLoader();
    fontLoader.load( '/fonts/helvetiker_regular.typeface.json', (font : Font) => {
      const textGeometry = new TextGeometry('Hello Three.js!', {
        font,
        size: 2,
        height: 0.1,
      });

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const text = new THREE.Mesh(textGeometry, textMaterial);
      text.position.set(-5, 0, 0);
      scene.add(text);
    });
  }, [scene]);

  return null;
};

export default TextDisplay;

