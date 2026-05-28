-- users_profile: extends auth.users with app-specific data
create table public.users_profile (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  medication text,
  current_dose numeric,
  start_date date,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'inactive',
  created_at timestamptz default now()
);

-- health_logs: daily tracking entries
create table public.health_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id) on delete cascade,
  log_date date not null,
  weight_kg numeric,
  dose_mg numeric,
  side_effects text,
  protein_grams integer,
  water_oz integer,
  energy_level integer check (energy_level between 1 and 5),
  notes text,
  created_at timestamptz default now(),
  unique(user_id, log_date)
);

-- weekly_insights: AI-generated weekly reports
create table public.weekly_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users_profile(id) on delete cascade,
  week_ending date not null,
  insight_text text,
  pdf_url text,
  sent_at timestamptz,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.users_profile enable row level security;
alter table public.health_logs enable row level security;
alter table public.weekly_insights enable row level security;

-- users_profile policies
create policy "Users can view own profile"
  on public.users_profile for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.users_profile for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.users_profile for update
  using (auth.uid() = id);

-- health_logs policies
create policy "Users can view own logs"
  on public.health_logs for select
  using (auth.uid() = user_id);

create policy "Users can insert own logs"
  on public.health_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update own logs"
  on public.health_logs for update
  using (auth.uid() = user_id);

create policy "Users can delete own logs"
  on public.health_logs for delete
  using (auth.uid() = user_id);

-- weekly_insights policies
create policy "Users can view own insights"
  on public.weekly_insights for select
  using (auth.uid() = user_id);

-- indexes for common queries
create index health_logs_user_date_idx on public.health_logs(user_id, log_date desc);
create index weekly_insights_user_date_idx on public.weekly_insights(user_id, week_ending desc);
