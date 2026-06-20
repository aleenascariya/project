import { useState } from "react";

import type {
  ActivityLog,
  AIInsight,
  AIRecommendation,
  ControlMode,
  LaneDirection,
  TrafficRecord,
  Vehicle,
} from "../types";

export function useTrafficEngine() {
  const [controlMode, setControlMode] =
    useState<ControlMode>("adaptive");

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [allVehicles, setAllVehicles] =
    useState<Vehicle[]>([]);

  const [activeGreenLane, setActiveGreenLane] =
    useState<LaneDirection>("North");

  const [logs, setLogs] =
    useState<ActivityLog[]>([]);

  const [savedRecords, setSavedRecords] =
    useState<TrafficRecord[]>([]);

  const [recommendations, setRecommendations] =
    useState<AIRecommendation[]>([]);

  const [insights, setInsights] =
    useState<AIInsight[]>([]);

  const [currentPrompt, setCurrentPrompt] =
    useState("");

  const addLog = (message: string) => {
    const newLog: ActivityLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      message,
    };

    setLogs((prev) => [newLog, ...prev]);
  };

  const getLaneCounts = () => ({
    North: allVehicles.filter(
      (vehicle) => vehicle.lane === "North"
    ).length,

    East: allVehicles.filter(
      (vehicle) => vehicle.lane === "East"
    ).length,

    South: allVehicles.filter(
      (vehicle) => vehicle.lane === "South"
    ).length,

    West: allVehicles.filter(
      (vehicle) => vehicle.lane === "West"
    ).length,
  });

  const getHighestDensityLane = (): LaneDirection => {
    const counts = getLaneCounts();

    let highestLane: LaneDirection = "North";

    if (counts.East > counts[highestLane]) {
      highestLane = "East";
    }

    if (counts.South > counts[highestLane]) {
      highestLane = "South";
    }

    if (counts.West > counts[highestLane]) {
      highestLane = "West";
    }

    return highestLane;
  };

  const getTotalVehicles = () => {
  return allVehicles.length;
  };

  const getTrafficStatus = () => {
    const totalVehicles = getTotalVehicles();

    if (totalVehicles === 0) {
      return "Idle";
    }

    if (totalVehicles <= 10) {
    return "Normal";
    }

    if (totalVehicles <= 20) {
      return "Busy";
    }

    return "Congested";
  };

  const generateRecommendation = () => {
    const busiestLane = getHighestDensityLane();

    const recommendation: AIRecommendation = {
      id: Date.now(),
      message: `Prioritize ${busiestLane} traffic flow`,
    };

    setRecommendations([recommendation]);
  };

  const runAdaptiveControl = () => {
    const nextLane = getHighestDensityLane();

    setActiveGreenLane(nextLane);

    addLog(`Adaptive mode selected ${nextLane}`);

    generateRecommendation();
  };

  const handleInjectVehicle = (
    lane: Vehicle["lane"]
  ) => {
    const newVehicle: Vehicle = {
      id: Date.now(),
      lane,
    };

    setAllVehicles((prev) => [
      ...prev,
      newVehicle,
    ]);

    addLog(`Vehicle added to ${lane}`);

    if (controlMode === "adaptive") {
      setTimeout(() => {
        runAdaptiveControl();
      }, 0);
    }
  };

  const handleOverrideLane = (
    lane: LaneDirection
  ) => {
    setActiveGreenLane(lane);

    addLog(`Signal changed to ${lane}`);
  };

  const clearVehicles = () => {
    setAllVehicles([]);
  
    addLog("All vehicles cleared");
  };

  const resetDashboard = () => {
    setAllVehicles([]);
    setLogs([]);
    setSavedRecords([]);
    setRecommendations([]);
    setInsights([]);
    setCurrentPrompt("");

    setActiveGreenLane("North");
    setControlMode("adaptive");
    setIsPlaying(false);

    setLogs([
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        message: "Dashboard reset",
      },
    ]);
  };

  const generateDemoTraffic = () => {
    const lanes: LaneDirection[] = [
       "North",
       "East",
       "South",
       "West",
     ];

    const vehicles: Vehicle[] = [];

    for (let i = 0; i < 10; i++) {
      vehicles.push({
        id: Date.now() + i,
        lane: lanes[
          Math.floor(Math.random() * lanes.length)
        ],
      });
    }

    setAllVehicles(vehicles);

    addLog("Demo traffic generated");

    if (controlMode === "adaptive") {
      setTimeout(() => {
        runAdaptiveControl();
      }, 0);
    }
  };

  const saveTrafficMetrics = () => {
    if (allVehicles.length === 0) {
      addLog("Save failed: no traffic data");

      return;
    }

    const newRecord: TrafficRecord = {
      id: Date.now(),
      totalVehicles: allVehicles.length,
      activeLane: activeGreenLane,
      controlMode,
      savedAt: new Date().toLocaleTimeString(),
    };

    setSavedRecords((prev) => [
      newRecord,
      ...prev,
    ]);

    addLog("Traffic metrics saved");
  };

  const generateInsight = () => {
    if (currentPrompt.trim() === "") {
      addLog("Insight generation failed");

      return;
    }

    const busiestLane = getHighestDensityLane();

    const insight: AIInsight = {
      id: Date.now(),
      prompt: currentPrompt,
      response: `Current traffic conditions suggest prioritizing ${busiestLane} lane.`,
    };

    setInsights((prev) => [
      insight,
      ...prev,
    ]);

    addLog("AI insight generated");
  };

  return {
    controlMode,
    setControlMode,

    isPlaying,
    setIsPlaying,

    allVehicles,

    activeGreenLane,

    logs,

    savedRecords,

    recommendations,

    insights,

    currentPrompt,
    setCurrentPrompt,

    handleInjectVehicle,
    handleOverrideLane,

    saveTrafficMetrics,

    getLaneCounts,
    getHighestDensityLane,

    runAdaptiveControl,

    generateRecommendation,
    generateInsight,

    getTotalVehicles,
    clearVehicles,
    resetDashboard,
    generateDemoTraffic,

    getTrafficStatus,
  };
}
