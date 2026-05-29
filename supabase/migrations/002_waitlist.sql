create table public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  email text not null unique,
  medication text not null,
  created_at timestamptz default now()
);

-- RLS intentionally disabled — these rows are read by admins via service role only
alter table public.waitlist_signups disable row level security;
