// lib/claude.ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateWeeklyInsight(
  logs: any[],
  profile: any
): Promise<string> {
  const logSummary = logs
    .map((log) => {
      const foodTagStr =
        log.food_tags?.length > 0 ? log.food_tags.join(", ") : "not logged";
      const injTimeStr = log.injection_time ?? "not logged";
      return `Date: ${log.log_date} | Weight: ${log.weight_kg ?? "—"}kg | Protein: ${log.protein_g ?? "—"}g | Water: ${log.water_ml ?? "—"}ml | Energy: ${log.energy_level ?? "—"}/10 | Side effects: ${log.side_effects?.join(", ") || "none"} | Food types: ${foodTagStr} | Injection time: ${injTimeStr}`;
    })
    .join("\n");

  const weightKg = profile.current_weight_kg ?? profile.starting_weight_kg ?? 80;
  const proteinTarget = Math.round(weightKg * 1.2);

  // Calculate average protein this week
  const proteinLogs = logs.filter((l) => l.protein_g != null);
  const avgProtein =
    proteinLogs.length > 0
      ? Math.round(
          proteinLogs.reduce((sum, l) => sum + l.protein_g, 0) /
            proteinLogs.length
        )
      : null;

  const proteinDeficit =
    avgProtein != null && avgProtein < proteinTarget * 0.5;

  const prompt = `You are a compassionate GLP-1 companion coach. The user is on ${profile.medication ?? "a GLP-1 medication"} at ${profile.current_dose ?? "their current"} dose. They have been on treatment since ${profile.start_date ?? "recently"}.

Here are their health logs for the past week:
${logSummary}

Their body weight is approximately ${weightKg}kg. Their daily protein target is ${proteinTarget}g (1.2g per kg of body weight). Their average protein intake this week was ${avgProtein != null ? `${avgProtein}g` : "not logged"}.
${proteinDeficit ? `\nCRITICAL: This user is averaging less than 50% of their protein target. They are at significant risk of losing muscle mass, not just fat. This must be prominently addressed.` : ""}

Write a personalised weekly insight in plain prose — no bullet points, no markdown, no bold text, no headers. Write exactly 4 paragraphs:

Paragraph 1 — Overall progress: Acknowledge what they logged this week. Be warm and specific. Reference actual numbers.

Paragraph 2 — Side effect & GI patterns: Look for correlations between their side effects, food types (high-fat, fried, alcohol, raw veg), and injection timing. If you see a pattern (e.g. nausea consistently follows high-fat meals, or peaks 2 days post-injection), name it clearly and give one concrete, actionable adjustment. If injection time is logged and side effects are present, suggest timing changes. If no clear pattern yet, explain what to watch for and encourage them to keep logging food types.

Paragraph 3 — Muscle loss & protein: ${proteinDeficit ? `This is urgent. They are averaging ${avgProtein}g against a target of ${proteinTarget}g — less than half what they need. Explain clearly that on GLP-1s, up to 50% of weight lost can be lean muscle mass when protein is this low. Name 3 specific high-protein, low-volume foods they can add today: Greek yogurt (17g per cup), cottage cheese (25g per cup), or a protein shake (25–30g). Be direct about the health risk without being alarmist.` : `Acknowledge their protein intake relative to their ${proteinTarget}g target. If they are hitting it, praise the habit specifically. If they are somewhat under, suggest one easy addition. Briefly remind them that GLP-1s suppress appetite so much that muscle loss is a silent risk — keeping protein up is the most important thing they can do alongside the medication.`}

Paragraph 4 — One thing for next week: Give exactly one specific, achievable action for the coming week. It should be the highest-leverage change based on their actual data this week — not generic advice.`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 800,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  return content.text;
}
