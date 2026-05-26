create extension if not exists "pgcrypto";

-- =========================================
-- TABLES
-- =========================================

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text,
  name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.work_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  session_date date not null,
  total_tickets integer not null default 0 check (total_tickets >= 0),
  goal_completed boolean not null default false,
  total_hours numeric(8,2) not null default 0,
  average_per_hour numeric(8,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.hourly_stats (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.work_sessions(id) on delete cascade,
  hour integer not null check (hour >= 0 and hour <= 23),
  tickets integer not null default 0 check (tickets >= 0)
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text not null,
  unlocked_at timestamptz not null default now()
);

-- =========================================
-- INDEXES
-- =========================================

create index if not exists users_clerk_user_id_idx
on public.users(clerk_user_id);

create index if not exists work_sessions_user_session_date_idx
on public.work_sessions(user_id, session_date desc);

create index if not exists hourly_stats_session_id_idx
on public.hourly_stats(session_id);

create index if not exists achievements_user_unlocked_idx
on public.achievements(user_id, unlocked_at desc);

-- =========================================
-- ENABLE RLS
-- =========================================

alter table public.users enable row level security;
alter table public.work_sessions enable row level security;
alter table public.hourly_stats enable row level security;
alter table public.achievements enable row level security;

-- =========================================
-- DROP OLD POLICIES (PREVENT ERRORS)
-- =========================================

drop policy if exists "User can insert own profile" on public.users;
drop policy if exists "User can select own profile" on public.users;

drop policy if exists "Work sessions can be inserted by owner" on public.work_sessions;
drop policy if exists "Work sessions can be selected by owner" on public.work_sessions;

drop policy if exists "Hourly stats can be inserted by owner" on public.hourly_stats;
drop policy if exists "Hourly stats can be selected by owner" on public.hourly_stats;

drop policy if exists "Achievements can be inserted by owner" on public.achievements;
drop policy if exists "Achievements can be selected by owner" on public.achievements;

-- =========================================
-- SIMPLE DEVELOPMENT POLICIES
-- =========================================
-- NOTE:
-- Since you're using Clerk and not Supabase Auth,
-- auth.uid() will NOT work correctly right now.
-- These policies allow authenticated access
-- while developing the MVP.

create policy "Allow authenticated access users"
on public.users
for all
to authenticated
using (true)
with check (true);

create policy "Allow authenticated access work_sessions"
on public.work_sessions
for all
to authenticated
using (true)
with check (true);

create policy "Allow authenticated access hourly_stats"
on public.hourly_stats
for all
to authenticated
using (true)
with check (true);

create policy "Allow authenticated access achievements"
on public.achievements
for all
to authenticated
using (true)
with check (true);