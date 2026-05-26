create extension if not exists "pgcrypto";

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
  date date not null,
  total_tickets integer not null default 0 check (total_tickets >= 0),
  goal_completed boolean not null default false,
  total_hours numeric(8, 2) not null default 0,
  average_per_hour numeric(8, 2) not null default 0,
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

create index if not exists users_clerk_user_id_idx on public.users(clerk_user_id);
create index if not exists work_sessions_user_date_idx on public.work_sessions(user_id, date desc);
create index if not exists hourly_stats_session_id_idx on public.hourly_stats(session_id);
create index if not exists achievements_user_unlocked_idx on public.achievements(user_id, unlocked_at desc);

alter table public.users enable row level security;
alter table public.work_sessions enable row level security;
alter table public.hourly_stats enable row level security;
alter table public.achievements enable row level security;
