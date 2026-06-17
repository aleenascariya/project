import { JunctionSimulator } from "./components/JunctionSimulator";
export default function App() {
	return (
		<div>
		<header>
		<h1>NeuralTraffic AI</h1>
		<p>Dynamic Stream: ONLINE</p>
		</header>

		<main>
		<aside>
		<h3>Control Paradigm</h3>

		<button>
		Adaptive AI
		</button>

		<button>
		Fixed Clock
		</button>

		<div>
		<p>Paused</p>

		<button>
		Play
		</button>
		</div>
		</aside>

		<section>
		<JunctionSimulator />
		<div>
		<h3>Live Density</h3>

		<ul>
		<li>North: LOW</li>
		<li>East: LOW</li>
		<li>South: LOW</li>
		<li>West: LOW</li>
		</ul>
		</div>
		</section>
		</main>
		</div>
	);
} 
