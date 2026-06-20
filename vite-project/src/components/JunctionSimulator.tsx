import type { LaneDirection, Vehicle } from "../types";

interface JunctionSimulatorProps {
  vehicles: Vehicle[];
  activeLane: LaneDirection;
}

export function JunctionSimulator({
  vehicles,
  activeLane,
}: JunctionSimulatorProps) {
  return (
    <div className="simulator">
      <h2>Traffic Junction Simulator</h2>

      <h3>
        Green Signal: {activeLane}
      </h3>

      <p>
        Total Vehicles: {vehicles.length}
      </p>

      <ul>
        <li>
          North: {
            vehicles.filter(
              (vehicle) => vehicle.lane === "North"
            ).length
          }
        </li>

        <li>
          East: {
            vehicles.filter(
              (vehicle) => vehicle.lane === "East"
            ).length
          }
        </li>

        <li>
          South: {
            vehicles.filter(
              (vehicle) => vehicle.lane === "South"
            ).length
          }
        </li>

        <li>
          West: {
            vehicles.filter(
              (vehicle) => vehicle.lane === "West"
            ).length
          }
        </li>
      </ul>

      <div>
        <h3>Vehicles</h3>

        {vehicles.length === 0 ? (
          <p>No vehicles available</p>
        ) : (
          <ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.id}>
                Vehicle #{vehicle.id} - {vehicle.lane}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
