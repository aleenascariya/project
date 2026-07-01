import Header from "./components/layout/Header";
import { JunctionSimulator } from "./components/JunctionSimulator";
import { useTrafficEngine } from "./hooks/useTrafficEngine";
import Card from "./components/ui/Card";
import StatCard from "./components/ui/StatCard";
import { Car, TrafficCone, Circle } from "lucide-react";
import StatusBadge from "./components/ui/StatusBadge";

export default function App() {
  const engine = useTrafficEngine();
  const laneCounts = engine.getLaneCounts();

  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      <Header
        latency="14 ms"
        version="v1.0"
        streamStatus="ONLINE"
      />

      <main className="grid grid-cols-[320px_1fr] gap-6 p-6">
        <aside className="bg-[#14171D] border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3>Control Paradigm</h3>

          <p>Current Mode: {engine.controlMode}</p>

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

	  <div>
            <h3>Simulation Controls</h3>

            <button
              onClick={engine.generateDemoTraffic}
            >
              Generate Demo Traffic
            </button>

            <button
              onClick={engine.clearVehicles}
            >
              Clear Vehicles
            </button>

            <button
              onClick={engine.resetDashboard}
            >
              Reset Dashboard
            </button>
          </div>
	  
        </aside>

        <section className="grid gap-6">
          <Card tiltle="AI Status">
            <h3>AI Status</h3>

            <p>
              {engine.controlMode === "adaptive"
                ? "Adaptive optimization active"
                : "Fixed timing active"}
            </p>
          </Card>

          <Card title="AI Recommendations">
            <h3>AI Recommendations</h3>

            {engine.recommendations.length === 0 ? (
              <p>Add vehicles to recieve AI recommendations</p>
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
          </Card>

          <Card title="AI Insights">
            <h3>AI Insights</h3>

            <textarea
              value={engine.currentPrompt}
              onChange={(event) =>
                engine.setCurrentPrompt(
                  event.target.value
                )
              }
              placeholder="Ask AI about current traffic conditions"
            />

            <button
              onClick={engine.generateInsight}
            >
              Generate Insight
            </button>

	    <p>
              Enter a prompt before generating insights.
            </p>

            {engine.insights.length === 0 ? (
              <p>No insights generated</p>
            ) : (
              <ul>
                {engine.insights.map((insight) => (
                  <li key={insight.id}>
                    {insight.response}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Active Signal">
            <h3>Active Signal</h3>

            <div className="signal-status">
              <span className="signal-dot"></span>

              <p>{engine.activeGreenLane}</p>
            </div>
          </Card>

	  <Card title="Traffic Statistics">
	    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

               <StatCard
                    title="Vehicles"
                    value={engine.getTotalVehicles()}
                    icon={<Car size={24} />}
               />

               <StatCard
                    title="Busiest Lane"
                    value={engine.getHighestDensityLane()}
                    icon={<TrafficCone size={24} />}
               />

               <StatCard
                    title="Green Signal"
                    value={engine.activeGreenLane}
                    icon={<Circle size={24} className="fill-green-500 text-green-500" />}
               />

             </div>
	   </Card>

          <Card title="System Health">
            <h3>System Health</h3>

	    <ul>
              <li>Status: {engine.getTrafficStatus()}</li>

              <li>
                Vehicles: {engine.getTotalVehicles()}
              </li>

              <li>
                Mode: {engine.controlMode}
              </li>
            </ul>
          </Card>

          <JunctionSimulator
            vehicles={engine.allVehicles}
            activeLane={engine.activeGreenLane}
          />

          <Card title="Live Density">

	    <div className="flex items-center justify-between">

    <h3 className="text-lg font-bold">
        Live Density
    </h3>

    <StatusBadge status="live" />

</div>
            <div className="space-y-5">

  {[
    { lane: "North", value: laneCounts.North },
    { lane: "East", value: laneCounts.East },
    { lane: "South", value: laneCounts.South },
    { lane: "West", value: laneCounts.West },
  ].map(({ lane, value }) => {

    const percent = Math.min((value / 10) * 100, 100);

    return (

      <div key={lane}>

        <div className="flex justify-between mb-1">

          <span className="font-semibold">
            {lane}
          </span>

          <span className="text-cyan-400">
            {value} Vehicles
          </span>

        </div>

        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

          <div
            className={`h-full transition-all duration-700 ${
              percent > 70
                ? "bg-red-500"
                : percent > 40
                ? "bg-yellow-400"
                : "bg-emerald-500"
            }`}
            style={{
              width: `${percent}%`,
            }}
          />

        </div>

      </div>

    );

  })}

</div>
          </Card>

          <Card title="Activity Stream">
            <h3>Activity Stream</h3>

	    <button onClick={engine.clearLogs}>
              Clear Logs
            </button>

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
          </Card>

          <Card title="Data Registry">
            <h3>Data Registry</h3>

            <button
              onClick={engine.saveTrafficMetrics}
            >
              Save
            </button>

	    <p>
              Save metrics after adding vehicles.
            </p>

            {engine.savedRecords.length === 0 ? (
              <p>No records saved</p>
            ) : (
              <ul>
                {engine.savedRecords.map((record) => (
                  <li key={record.id}>
                    Vehicles: {record.totalVehicles}
                    {" | "}
                    Active Lane: {record.activeLane}
                    {" | "}
                    Mode: {record.controlMode}
                    {" | "}
                    Saved: {record.savedAt}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>
      </main>
      <footer>
        <p>
          NeuralTraffic AI v1.0
        </p>
      </footer>

    </div>
  );
}
