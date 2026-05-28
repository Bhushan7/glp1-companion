export interface UserProfile {
  id: string
  email: string | null
  name: string | null
  medication: string | null
  current_dose: number | null
  start_date: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: string
  created_at: string
}

export interface HealthLog {
  id: string
  user_id: string
  log_date: string
  weight_kg: number | null
  dose_mg: number | null
  side_effects: string | null
  protein_grams: number | null
  water_oz: number | null
  energy_level: number | null
  notes: string | null
  created_at: string
}

export interface WeeklyInsight {
  id: string
  user_id: string
  week_ending: string
  insight_text: string | null
  pdf_url: string | null
  sent_at: string | null
  created_at: string
}
