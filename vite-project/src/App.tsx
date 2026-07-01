import Header from "./components/layout/Header";
import { JunctionSimulator } from "./components/JunctionSimulator";
import { useTrafficEngine } from "./hooks/useTrafficEngine";
import Card from "./components/ui/Card";
import StatCard from "./components/ui/StatCard";
import { Car, TrafficCone, Circle } from "lucide-react";
import StatusBadge from "./components/ui/StatusBadge";
import AIStatusPanel from "./components/dashboard/AIStatusPanel";
import PrimaryButton from "./components/ui/PrimaryButton";
import AIRecommendationPanel from "./components/dashboard/AIRecommendationPanel";
import AIInsightPanel from "./components/dashboard/AIInsightPanel";

export default function App() {
  const engine = useTrafficEngine();
  const laneCounts = engine.getLaneCounts();

  return (
    <div className="space-y-3 border-t border-white/10 pt-5 mt-5">
      <Header
        latency="14 ms"
        version="v1.0"
        streamStatus="ONLINE"
      />

      <main className="grid grid-cols-[320px_1fr] gap-6 p-6">
        <aside className="sticky top-6 h-[calc(100vh-7rem)] overflow-y-auto bg-[#14171D] border border-white/10 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold mb-4">
    AI CONTROL
</h3>

          <div className="mb-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">

    <p className="text-xs text-slate-400 uppercase">
        Current Mode
    </p>

    <h2 className="text-lg font-bold text-white mt-1">
        {engine.controlMode === "adaptive"
            ? "Adaptive AI"
            : "Fixed Clock"}
    </h2>

</div>

          <PrimaryButton
    className="w-full mb-3"
    onClick={() => engine.setControlMode("adaptive")}
>
    Adaptive AI
</PrimaryButton>

          <PrimaryButton
    className="w-full"
    onClick={() => engine.setControlMode("fixed")}
>
    Fixed Clock
</PrimaryButton>

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

          <div className="border-t border-white/10 pt-6 mt-6">
	  <h3 className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold mb-4">
    VEHICLE INJECTION
</h3>

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

          <div className="border-t border-white/10 pt-6 mt-6">
    <h3 className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold mb-4">
        PHASE OVERRIDES
    </h3>

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

	  <div className="border-t border-white/10 pt-6 mt-6">
    <h3 className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold mb-4">
        SIMULATION CONTROLS
    </h3>

            <PrimaryButton
              onClick={engine.generateDemoTraffic}
            >
              Generate Demo Traffic
            </PrimaryButton>

            <PrimaryButton
              onClick={engine.clearVehicles}
            >
              Clear Vehicles
            </PrimaryButton>

            <PrimaryButton
              onClick={engine.resetDashboard}
            >
              Reset Dashboard
            </PrimaryButton>
          </div>
	  
        </aside>

        <section className="grid grid-cols-12 gap-6 auto-rows-min">
          <div className="col-span-6">
	  <AIStatusPanel
    controlMode={engine.controlMode}
/>
           </div>

	   <div className="col-span-6">
          <AIRecommendationPanel
    recommendations={engine.recommendations}
/>

          </div>

	  <div className="col-span-8">
	  <AIInsightPanel
  currentPrompt={engine.currentPrompt}
  setCurrentPrompt={engine.setCurrentPrompt}
  generateInsight={engine.generateInsight}
  insights={engine.insights}
/>

	  </div>

	  <Card title="Active Signal">

            <div className="signal-status">
              <span className="signal-dot"></span>

              <p>{engine.activeGreenLane}</p>
            </div>
          </Card>

	  <div className="col-span-12">
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
	   </div>

          <Card title="System Health">

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

          <Card title="Intersection Simulator">

    <div className="col-span-12">
    <JunctionSimulator
        vehicles={engine.allVehicles}
        activeLane={engine.activeGreenLane}
    />
    </div>

</Card>

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

	    <PrimaryButton onClick={engine.clearLogs}>
              Clear Logs
            </PrimaryButton>

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

            <PrimaryButton
              onClick={engine.saveTrafficMetrics}
            >
              Save
            </PrimaryButton>

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
