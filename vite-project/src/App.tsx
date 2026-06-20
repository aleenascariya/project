import { JunctionSimulator } from "./components/JunctionSimulator";
import { useTrafficEngine } from "./hooks/useTrafficEngine";

export default function App() {
	const engine = useTrafficEngine();
	const laneCounts = engine.getLaneCounts();

	return (
		<div>
		<header>
		<h1>NeuralTraffic AI</h1>
		<p>Dynamic Stream: ONLINE</p>
		</header>

		<main>
		<aside>
		<h3>Control Paradigm</h3>

		<p>
		Current Mode: {engine.controlMode}
		</p>

		<button
		onClick={() => engine.setControlMode("adaptive")}
		>
		Adaptive AI
		</button>

		<button
		onClick={() => engine.setControlMode("fixed")}
		>
		Fixed Clock
		</button>

		<div>
		<p>
		{engine.isPlaying
			? "Active Processing"
			: "Paused"}
		</p>

		<button 
		onClick={() =>
			engine.setIsPlaying(!engine.isPlaying)
		}
		>
		{engine.isPlaying ? "Pause" : "Play"}
		</button>
		</div>

		<div>
		<h3>Vehicle Injection</h3>

		<button
		onClick={() =>
			engine.handleInjectVehicle("North")
		}
		>
		Add North Vehicle
		</button>

		<button
		onClick={() =>
			engine.handleInjectVehicle("East")
		}
		>
		Add East Vehicle
		</button>

		<button
		onClick={() =>
			engine.handleInjectVehicle("South")
		}
		>
		Add South Vehicle
		</button>

		<button
		onClick={() =>
			engine.handleInjectVehicle("West")
		}
		>
		Add West Vehicle
		</button>
		</div>

		<div>
		<h3>Phase Overrides</h3>

		<button
		onClick={() =>
			engine.handleOverrideLane("North")
		}
		>
		North
		</button>

		<button
		onClick={() =>
			engine.handleOverrideLane("East")
		}
		>
		East
		</button>

		<button
		onClick={() =>
			engine.handleOverrideLane("South")
		}
		>
		South
		</button>

		<button
		onClick={() =>
			engine.handleOverrideLane("West")
		}
		>
		West
		</button>
		</div>
		</div>
		</aside>

		<section>

		<div>
		<h3>AI Status</h3>

		<p>
		{engine.controlMode === "adaptive"
			? "Adaptive optimization active"
			: "Fixed timing active"}
		</p>
		</div>

		<div>

		<h3>AI Recommendations</h3>

		{engine.recommendations.length === 0 ? (
			<p>No recommendations available</p>
		) : (
		<ul>
		{engine.recommendations.map(
			(recommendation) => (
				<li key={recommendation.id}>
				{recommendation.message}
				</li>
			)
		)}
		</ul>
		)}

		</div>

		<div>
		<h3>Active Signal</h3>

		<p>{engine.activeGreenLane}</p>
		</div>


		<JunctionSimulator
		vehicles={engine.allVehicles}
		activeLane={engine.activeGreenLane}
		/>
		
		<div>
		<h3>Live Density</h3>

		<ul>
		<li>North: {laneCounts.North}</li>
		<li>East: {laneCounts.East}</li>
		<li>South: {laneCounts.South}</li>
		<li>West: {laneCounts.West}</li>
		</ul>
		</div>

		<div>
		<h3>Activity Stream</h3>

		{engine.logs.length === 0 ? (
			<p>No activity available</p>
		) : (
		<ul>
		{engine.logs.map((log) => (
			<li key={log.id}>
			{log.time} - {log.message}
			</li>
		))}
		</ul>
		)}
		</div>

		<div>
		<h3>Data Registry</h3>

		<button
		onClick={engine.saveTrafficMetrics}
		>
		Save
		</button>
		
		<ul>
		{engine.savedRecords.map((record) => (
			<li key={record.id}>
			Vehicles: {record.totalVehicles}
			{" | "}
			Active Lane: {record.activeLane}
			</li>
		))}
		</ul>

		</div>
		</section>
		</main>
		</div>
	);
} 
