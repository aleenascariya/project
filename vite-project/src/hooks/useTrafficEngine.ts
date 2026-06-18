import { useState } from "react";
import {
  ControlMode,
  Vehicle,
  LaneDirection,
  ActivityLog,
  TrafficRecord,
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

  const addLog = (message: string) => {
  const newLog: ActivityLog = {
    id: Date.now(),
    time: new Date().toLocaleTimeString(),
    message,
  };

  setLogs((prev) => [
    newLog,
    ...prev,
  ]);
};
  
  const handleInjectVehicle = (
	  lane: Vehicle["lane"]
  ) => {
  const newVehicle: Vehicle = {
	  id: Date.now(),
	  lane,
  };
  setAllVehicles((prev) => {
  const updatedVehicles = [
    ...prev,
    newVehicle,
  ];

  return updatedVehicles;
});

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

  const runAdaptiveControl = () => {
  const nextLane = getHighestDensityLane();

  setActiveGreenLane(nextLane);

  addLog(`Adaptive mode selected ${nextLane}`);
};

  const saveTrafficMetrics = () => {
  const newRecord: TrafficRecord = {
    id: Date.now(),
    totalVehicles: allVehicles.length,
    activeLane: activeGreenLane,
  };

  setSavedRecords((prev) => [
    newRecord,
    ...prev,
  ]);

  addLog("Traffic metrics saved");
};

  return {
    controlMode,
    setControlMode,
    isPlaying,
    setIsPlaying,
    getLaneCounts,
    allVehicles,
    setAllVehicles,
    handleInjectVehicle,
    activeGreenLane,
    setActiveGreenLane,
    handleOverrideLane,
    logs,
    addLog,
    savedRecords,
    saveTrafficMetrics,
    getHighestDensityLane,
    runAdaptiveControl,
  };
}
