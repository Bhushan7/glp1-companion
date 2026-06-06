import Anthropic from "@anthropic-ai/sdk";
import type { HealthLog } from "@/types/database";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface Injection {
  id: string;
  user_id: string;
  injected_at: string;
  dose_mg: number;
  site: string;
  notes: string | null;
  created_at: string;
}

export async function generateWeeklyInsight(
  logs: HealthLog[],
  profile: {
    name?: string | null;
    medication?: string | null;
    current_dose?: number | null;
    start_date?: string | null;
    current_weight_kg?: number | null;
    starting_weight_kg?: number | null;
  },
  priorInsights: string[],
  recentInjections?: Injection[]
): Promise<{ weeklyInsight: string; journeyInsight: string }> {
  const logSummary = logs
    .map((log) => {
      const foodTagStr =
        log.food_tags?.length > 0 ? log.food_tags.join(", ") : "not logged";
      const injTimeStr = log.injection_time ?? "not logged";
      return `Date: ${log.log_date} | Weight: ${log.weight_kg ?? "—"}kg | Protein: ${log.protein_grams ?? "—"}g | Water: ${log.water_oz ?? "—"}oz | Energy: ${log.energy_level ?? "—"}/5 | Food noise: ${log.food_noise_level ?? "—"}/10 | Side effects: ${log.side_effects || "none"} | Food types: ${foodTagStr} | Injection time: ${injTimeStr}`;
    })
    .join("\n");

  const weightKg = profile.current_weight_kg ?? profile.starting_weight_kg ?? 80;
  const proteinTarget = Math.round(weightKg * 1.2);

  const proteinLogs = logs.filter((l) => l.protein_grams != null);
  const avgProtein =
    proteinLogs.length > 0
      ? Math.round(
          proteinLogs.reduce((sum, l) => sum + (l.protein_grams as number), 0) /
            proteinLogs.length
        )
      : null;

  const proteinDeficit =
    avgProtein != null && avgProtein < proteinTarget * 0.5;

  // Plateau detection: 14+ consecutive days with weight variance < 0.5kg
  const weightLogs = [...logs]
    .filter((l) => l.weight_kg != null)
    .sort((a, b) => a.log_date.localeCompare(b.log_date));
  let plateauInstruction = "";
  if (weightLogs.length >= 14) {
    const weights = weightLogs.map((l) => l.weight_kg as number);
    const maxW = Math.max(...weights);
    const minW = Math.min(...weights);
    const firstDate = new Date(weightLogs[0].log_date);
    const lastDate = new Date(weightLogs[weightLogs.length - 1].log_date);
    const span = Math.round(
      (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (maxW - minW < 0.5 && span >= 14) {
      plateauInstruction = `IMPORTANT PLATEAU CONTEXT: This user's weight has been stable (within ${(maxW - minW).toFixed(2)}kg) for ${span} days. Open Paragraph 1 with a plateau reframe BEFORE anything else — acknowledge the scale hasn't moved, explain body recomposition (fat loss can occur while retaining water and preserving lean mass), and point to a specific non-scale win from their actual data this week (protein intake, energy levels, fewer side effects, or logging consistency). Make this feel genuinely reassuring, not dismissive.`;
    }
  }

  // Food noise context for Paragraph 2
  const foodNoiseLogs = logs.filter((l) => l.food_noise_level != null);
  let foodNoiseInstruction = "";
  if (foodNoiseLogs.length >= 3) {
    foodNoiseInstruction = `They have also logged food noise (psychological cravings/urges) on ${foodNoiseLogs.length} days this week. Analyse the pattern — identify the day of week or situation where food noise is highest and include one CBT-style micro-challenge for the coming week. Example format: "Your food noise peaks on [day/situation] — this is often [reason e.g. boredom or social eating]. This week, try [specific CBT micro-challenge, e.g. identifying the exact moment the urge starts and waiting 10 minutes before acting on it]."`;
  } else if (foodNoiseLogs.length > 0) {
    foodNoiseInstruction = `They have started logging food noise but only on ${foodNoiseLogs.length} day(s) — not enough data for a pattern yet. Briefly acknowledge this and encourage them to keep logging food noise so patterns can emerge next week.`;
  }

  // Injection pattern context for Paragraph 2
  let injectionInstruction = "";
  if (recentInjections && recentInjections.length > 0) {
    const injSummary = recentInjections
      .map((inj) => {
        const d = new Date(inj.injected_at);
        const dateStr = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
        const timeStr = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        return `${dateStr} ${timeStr} | ${inj.dose_mg}mg | site: ${inj.site}${inj.notes ? ` | notes: ${inj.notes}` : ""}`;
      })
      .join("\n");

    const sites = recentInjections.map((i) => i.site);
    const topSite = sites[0];
    const repeatCount = sites.filter((s) => s === topSite).length;
    const siteRepeatWarning =
      repeatCount >= 3
        ? ` IMPORTANT: The user has used '${topSite}' for ${repeatCount} of their last ${sites.length} injections — flag this clearly: "Rotating injection sites reduces tissue buildup and improves absorption."`
        : "";

    injectionInstruction = `\n\nINJECTION HISTORY (most recent first):\n${injSummary}\n\nCross-reference these injection dates with the side effects logged above. If nausea, fatigue, or GI symptoms appear 1–3 days after an injection, name the specific day pattern (e.g. "nausea typically peaks 2 days post-injection — Tuesday if you inject Sunday") and suggest a concrete timing adjustment such as injecting in the evening after a protein-rich meal, or shifting injection day.${siteRepeatWarning}`;
  }

  const prompt = `You are a compassionate GLP-1 companion coach. The user is on ${profile.medication ?? "a GLP-1 medication"} at ${profile.current_dose ?? "their current"} dose. They have been on treatment since ${profile.start_date ?? "recently"}.

Here are their health logs for the past week:
${logSummary}

Their body weight is approximately ${weightKg}kg. Their daily protein target is ${proteinTarget}g (1.2g per kg of body weight). Their average protein intake this week was ${avgProtein != null ? `${avgProtein}g` : "not logged"}.
${proteinDeficit ? `\nCRITICAL: This user is averaging less than 50% of their protein target. They are at significant risk of losing muscle mass, not just fat. This must be prominently addressed.` : ""}

Write a personalised weekly insight in plain prose — no bullet points, no markdown, no bold text, no headers. Write exactly 4 paragraphs:

Paragraph 1 — Overall progress: ${plateauInstruction ? plateauInstruction + " Then continue with your overall progress commentary." : "Acknowledge what they logged this week. Be warm and specific. Reference actual numbers."}

Paragraph 2 — Side effect & GI patterns + Food Noise Psychology: Look for correlations between their side effects, food types (high-fat, fried, alcohol, raw veg), and injection timing. If you see a pattern (e.g. nausea consistently follows high-fat meals, or peaks 2 days post-injection), name it clearly and give one concrete, actionable adjustment. If injection time is logged and side effects are present, suggest timing changes. If no clear pattern yet, explain what to watch for and encourage them to keep logging food types. ${foodNoiseInstruction}${injectionInstruction}

Paragraph 3 — Muscle loss & protein: ${proteinDeficit ? `This is urgent. They are averaging ${avgProtein}g against a target of ${proteinTarget}g — less than half what they need. Explain clearly that on GLP-1s, up to 50% of weight lost can be lean muscle mass when protein is this low. Name 3 specific high-protein, low-volume foods they can add today: Greek yogurt (17g per cup), cottage cheese (25g per cup), or a protein shake (25–30g). Be direct about the health risk without being alarmist.` : `Acknowledge their protein intake relative to their ${proteinTarget}g target. If they are hitting it, praise the habit specifically. If they are somewhat under, suggest one easy addition. Briefly remind them that GLP-1s suppress appetite so much that muscle loss is a silent risk — keeping protein up is the most important thing they can do alongside the medication.`}

Paragraph 4 — One thing for next week: Give exactly one specific, achievable action for the coming week. It should be the highest-leverage change based on their actual data this week — not generic advice.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
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

  const weeklyInsight = content.text;

  if (priorInsights.length === 0) {
    return {
      weeklyInsight,
      journeyInsight:
        "This is your first insight — check back next week for your journey summary.",
    };
  }

  const journeyContext = priorInsights
    .map((t, i) => `--- Week ${i + 1} ---\n${t}`)
    .join("\n\n");

  const journeyPrompt = `You are a compassionate GLP-1 companion coach. Review this user's complete journey history and write exactly 5 sentences in plain prose — no bullet points, no markdown, no bold text, no headers.

Here are all of their previous weekly insights in chronological order:
${journeyContext}

Write exactly 5 sentences:
Sentence 1: What has consistently worked for this user (weight trend, protein habits, energy patterns).
Sentence 2: What has been a recurring challenge (side effects, low protein, plateaus).
Sentence 3: How their overall journey is progressing based on the full history.
Sentences 4–5: A motivational message. If the overall trajectory is positive (weight trending down, protein improving, energy stable or rising), write an affirming message acknowledging their consistency. If the trajectory is struggling (weight stalled or rising, protein consistently low, frequent side effects), write an encouraging message that normalises difficulty and reinforces that staying the course matters.

Output exactly 5 sentences, nothing else.`;

  const journeyMessage = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 400,
    messages: [{ role: "user", content: journeyPrompt }],
  });

  const journeyContent = journeyMessage.content[0];
  if (journeyContent.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  return {
    weeklyInsight,
    journeyInsight: journeyContent.text,
  };
}

export async function generateTaperPlan(
  profile: {
    name?: string | null;
    medication?: string | null;
    current_dose?: number | null;
    start_date?: string | null;
    current_weight_kg?: number | null;
    starting_weight_kg?: number | null;
  },
  maintenanceGoals: {
    target_weight_kg?: number | null;
    taper_start_date?: string | null;
    current_dose_mg?: number | null;
    target_dose_mg?: number | null;
    notes?: string | null;
  },
  recentLogs: HealthLog[]
): Promise<string> {
  const weightKg = profile.current_weight_kg ?? profile.starting_weight_kg ?? 80;

  const avgNoiseLogs = recentLogs.filter((l) => l.food_noise_level != null);
  const avgNoise =
    avgNoiseLogs.length > 0
      ? (avgNoiseLogs.reduce((s, l) => s + (l.food_noise_level as number), 0) / avgNoiseLogs.length).toFixed(1)
      : null;

  const avgProteinLogs = recentLogs.filter((l) => l.protein_grams != null);
  const avgProtein =
    avgProteinLogs.length > 0
      ? Math.round(avgProteinLogs.reduce((s, l) => s + (l.protein_grams as number), 0) / avgProteinLogs.length)
      : null;

  const taperGoal =
    maintenanceGoals.target_dose_mg === 0
      ? "full cessation (0 mg)"
      : `maintenance microdose of ${maintenanceGoals.target_dose_mg} mg`;

  const taperPrompt = `You are a compassionate GLP-1 companion coach helping a user plan their off-ramp from ${profile.medication ?? "their GLP-1 medication"}.

User context:
- Current dose: ${maintenanceGoals.current_dose_mg} mg
- Taper goal: ${taperGoal}
- Planned taper start: ${maintenanceGoals.taper_start_date ?? "not set yet"}
- Target weight: ${maintenanceGoals.target_weight_kg ? `${maintenanceGoals.target_weight_kg} kg` : "not set"}
- Current weight: approximately ${weightKg} kg
- Average food noise level (last 14 days): ${avgNoise !== null ? `${avgNoise}/10` : "not enough data"}
- Average daily protein (last 14 days): ${avgProtein !== null ? `${avgProtein}g` : "not logged"}
- User notes: ${maintenanceGoals.notes ?? "none"}

Write a plain prose taper plan — no bullet points, no markdown, no bold text, no headers. Write exactly 5 paragraphs, one for each week of the taper. Each paragraph must cover:
1. The dose for that week (specific mg)
2. The physical changes to expect that week (appetite, energy, weight)
3. The food noise and hunger changes to expect (be specific — food noise often increases 2–4 weeks after dose reduction)
4. One concrete action to take if things feel hard that week (not generic — make it specific to the dose stage)

The taper should step down gradually from ${maintenanceGoals.current_dose_mg} mg toward ${taperGoal}. Use medically sensible steps (e.g. halving dose each month, or standard semaglutide step-down). Be warm, specific, and practical. This is a plan, not a warning — frame each paragraph around what to do, not what to fear.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 900,
    messages: [{ role: "user", content: taperPrompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  return content.text;
}

// ─── Daily coach's note (Haiku) ──────────────────────────────────────────────

export async function generateDailyInsight(log: {
  log_date: string;
  weight_kg?: number | null;
  dose_mg?: number | null;
  injection_time?: string | null;
  side_effects?: string | null;
  food_tags?: string[];
  protein_grams?: number | null;
  water_oz?: number | null;
  energy_level?: number | null;
  food_noise_level?: number | null;
  notes?: string | null;
}): Promise<string> {
  const weightKg = log.weight_kg ?? null;
  const proteinTarget = weightKg != null ? Math.round(weightKg * 1.2) : null;
  const proteinPct =
    proteinTarget && log.protein_grams != null
      ? Math.round((log.protein_grams / proteinTarget) * 100)
      : null;

  const foodTagStr =
    log.food_tags && log.food_tags.length > 0
      ? log.food_tags.join(", ")
      : "not logged";

  const prompt = `You are a concise GLP-1 companion coach. The user just logged their health data for today. Write exactly 2–3 sentences in plain prose. No markdown, no bullet points, no headers. Be specific about their actual numbers. Tone: warm and direct, like a coach leaving a quick note after a training session.

Today's log:
- Date: ${log.log_date}
- Weight: ${log.weight_kg != null ? `${log.weight_kg} kg` : "not logged"}
- Dose: ${log.dose_mg != null ? `${log.dose_mg} mg` : "not logged"}
- Protein: ${log.protein_grams != null ? `${log.protein_grams}g` : "not logged"}${proteinTarget != null ? ` (daily target: ${proteinTarget}g based on body weight)` : ""}${proteinPct != null ? ` — ${proteinPct}% of target` : ""}
- Water: ${log.water_oz != null ? `${log.water_oz} oz` : "not logged"}
- Energy: ${log.energy_level != null ? `${log.energy_level}/5` : "not logged"}
- Food noise: ${log.food_noise_level != null ? `${log.food_noise_level}/10` : "not logged"}
- Side effects: ${log.side_effects || "none"}
- Food types eaten: ${foodTagStr}
- Injection time: ${log.injection_time ?? "not logged"}
- Notes: ${log.notes || "none"}

Instructions: Pick the single most important observation about today's data. Priority order: (1) if protein is below 50% of target, lead with that and name one specific food that would help; (2) if a side effect is logged alongside a food type, connect them; (3) if food noise is 7+, acknowledge it and give one grounding thought; (4) if it is a solid day overall, acknowledge one specific win. End with one concrete thing they can do or notice tomorrow. Write 2–3 sentences only.`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 150,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  return content.text;
}
