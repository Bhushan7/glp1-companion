import Anthropic from '@anthropic-ai/sdk'
import type { HealthLog } from '@/types/database'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a warm, encouraging GLP-1 companion coach. Analyze the user's weekly health log and write a personalized insight report in plain conversational prose — no markdown, no bullet points, no headers, no bold text, no symbols or emojis.

Write exactly three paragraphs separated by a blank line:
- Paragraph 1: One specific thing they did well this week, referencing actual numbers from their log.
- Paragraph 2: One pattern you noticed — a correlation between their food, hydration, energy, side effects, or weight. Be specific, not generic.
- Paragraph 3: One gentle, actionable suggestion for next week. Keep it encouraging and realistic.

Use their first name naturally. Never give medical advice. Keep the total to around 150–200 words.`

function formatLog(log: HealthLog): string {
  return [
    log.log_date,
    log.weight_kg != null ? `${log.weight_kg}kg` : '-',
    log.dose_mg != null ? `${log.dose_mg}mg` : '-',
    log.protein_grams != null ? `${log.protein_grams}g protein` : '-',
    log.water_oz != null ? `${log.water_oz}oz water` : '-',
    log.energy_level != null ? `energy ${log.energy_level}/5` : '-',
    log.side_effects || 'no side effects',
    log.notes || '',
  ].join(' | ')
}

export async function generateWeeklyInsight(
  userName: string,
  medication: string,
  weeksSinceStart: number,
  logs: HealthLog[]
): Promise<string> {
  const logLines = logs.map(formatLog).join('\n')

  const userPrompt = `User: ${userName}
Medication: ${medication}
Weeks since starting: ${weeksSinceStart}

Weekly health logs (Date | Weight | Dose | Protein | Water | Energy | Side Effects | Notes):
${logLines}

Write the three-paragraph insight report in plain prose.`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const block = message.content[0]
  if (block.type !== 'text') {
    throw new Error('Unexpected response type from Claude API')
  }
  return block.text
}
