// import { PropsWithChildren } from 'react'

// type FooProps = {
// 	text: 'foo'
//   }

//   type Props = {
// 	children: React.ReactNode | () => JSX.Element
//   }
import "./button.scoped.css";

function Button({ children, format }:{ children: string, format: string }) {
	return (
		<button
			type="button"
			className={`button ${format}`}
		>
			{children}
		</button>
	);
}

export default Button;
