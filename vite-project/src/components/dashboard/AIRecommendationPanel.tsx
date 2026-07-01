import { BrainCircuit } from "lucide-react";
import Card from "../ui/Card";

interface Recommendation {
  id: string;
  message: string;
}

interface AIRecommendationPanelProps {
  recommendations: Recommendation[];
}

export default function AIRecommendationPanel({
  recommendations,
}: AIRecommendationPanelProps) {
  return (
    <Card
      title="AI Recommendations"
      icon={<BrainCircuit size={18} className="text-cyan-400" />}
    >
      {recommendations.length === 0 ? (
        <p className="text-slate-400">
          Add vehicles to receive AI recommendations.
        </p>
      ) : (
        <div className="space-y-3">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation.id}
              className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
            >
              <p className="text-white">
                {recommendation.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
