import { useState } from "react";
import {
  ControlMode,
  Vehicle,
  LaneDirection,
  ActivityLog,
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
};

  const handleOverrideLane = (
	  lane: LaneDirection
  ) => {
	  setActiveGreenLane(lane);
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
  };
}
