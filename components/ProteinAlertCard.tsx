"use client";

interface Props {
  weightKg: number;
  avgProteinG: number | null;
  daysLogged: number;
}

export default function ProteinAlertCard({ weightKg, avgProteinG, daysLogged }: Props) {
  const target = Math.round(weightKg * 1.2);

  if (daysLogged < 2 || avgProteinG === null) return null;

  const pct = Math.round((avgProteinG / target) * 100);
  const isCritical = avgProteinG < target * 0.5;

  if (pct >= 75) return null;

  return (
    <div
      className={`rounded-xl p-4 border ${
        isCritical
          ? "bg-red-50 border-red-200"
          : "bg-amber-50 border-amber-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{isCritical ? "🚨" : "⚠️"}</span>
        <div className="flex-1 min-w-0">
          <p
            className={`font-semibold text-sm ${
              isCritical ? "text-red-800" : "text-amber-800"
            }`}
          >
            {isCritical ? "Muscle loss risk — protein critically low" : "Protein below target"}
          </p>
          <p
            className={`text-sm mt-1 ${
              isCritical ? "text-red-700" : "text-amber-700"
            }`}
          >
            You're averaging {avgProteinG}g/day. Your target is {target}g
            ({pct}% of goal).
          </p>
          {isCritical && (
            <p className="text-xs text-red-600 mt-2">
              On GLP-1s, up to 50% of weight lost can be lean muscle when
              protein is this low. Try: Greek yogurt (17g), cottage cheese
              (25g), or a protein shake (25–30g).
            </p>
          )}
          {/* Progress bar */}
          <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full transition-all ${
                isCritical ? "bg-red-400" : "bg-amber-400"
              }`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{pct}% of daily target</p>
        </div>
      </div>
    </div>
  );
}
