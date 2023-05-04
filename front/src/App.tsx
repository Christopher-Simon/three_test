import { Canvas } from '@react-three/fiber'
import Box from './game/Box'

function App() {
	return (
		<Canvas camera={{ position: [0, 0, 2] }}>
			<Box />
		</Canvas>
	);
}

export default App;
