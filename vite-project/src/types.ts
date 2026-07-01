export type LaneDirection =
  | "North"
  | "East"
  | "South"
  | "West";

export type VehicleType =
  | "car"
  | "truck";

export type ControlMode =
  | "adaptive"
  | "fixed";

export type CameraMode =
  | "overview"
  | "north"
  | "east"
  | "south"
  | "west";

export interface Vehicle {
  id: number;
  lane: LaneDirection;
  type: VehicleType;
  speed: number;
  createdAt: number;
}

export interface TrafficSignal {
  lane: LaneDirection;
  state: "red" | "green";
}

export interface ActivityLog {
  id: number;
  time: string;
  source: "AI" | "SYSTEM" | "USER";
  message: string;
}

export interface SavedTrafficRecord {
  id: number;
  totalVehicles: number;
  activeLane: LaneDirection;
  controlMode: ControlMode;
  aiWait: number;
  savedAt: string;
}

export interface GeminiAnalysis {
  prompt: string;
  report: string;
}

export interface LaneDensity {
  North: number;
  East: number;
  South: number;
  West: number;
}
