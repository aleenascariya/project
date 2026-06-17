import { useState } from "react";
import { ControlMode } from "../types";

export function useTrafficEngine() {
  const [controlMode, setControlMode] =
    useState<ControlMode>("adaptive");

  const [isPlaying, setIsPlaying] =
    useState(false);

  return {
    controlMode,
    setControlMode,
    isPlaying,
    setIsPlaying,
  };
}
