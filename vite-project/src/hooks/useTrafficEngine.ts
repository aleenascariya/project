import { useState } from "react";
import { ControlMode } from "../types";

export function useTrafficEngine() {
  const [controlMode, setControlMode] =
    useState<ControlMode>("adaptive");

  const [isPlaying, setIsPlaying] =
    useState(false);
  
  const getLaneCounts = () => ({
  North: 0,
  East: 0,
  South: 0,
  West: 0,
});

  return {
    controlMode,
    setControlMode,
    isPlaying,
    setIsPlaying,
    getLaneCounts,
  };
}
