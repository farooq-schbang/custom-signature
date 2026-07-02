-- Custom Signature: initial schema
-- profiles (1:1 auth.users), signatures, orders + RLS

-- ── profiles ──────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  company text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: select own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles: insert own" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── signatures ────────────────────────────────────────────
create table public.signatures (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users on delete cascade,
  config jsonb not null,
  is_paid boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index signatures_owner_idx on public.signatures (owner_id);

alter table public.signatures enable row level security;

create policy "signatures: select own" on public.signatures
  for select using (auth.uid() = owner_id);
create policy "signatures: insert own" on public.signatures
  for insert with check (auth.uid() = owner_id and is_paid = false);
-- Owners may edit config of their signatures, but can never flip is_paid.
-- is_paid is only set by the Stripe webhook via the service-role key (bypasses RLS).
create policy "signatures: update own (not is_paid)" on public.signatures
  for update using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id and is_paid = (select s.is_paid from public.signatures s where s.id = id));
create policy "signatures: delete own" on public.signatures
  for delete using (auth.uid() = owner_id);

-- Keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger signatures_touch_updated_at
  before update on public.signatures
  for each row execute function public.touch_updated_at();

-- ── orders ────────────────────────────────────────────────
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  signature_id uuid not null references public.signatures on delete cascade,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  amount integer not null default 800,
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  created_at timestamptz not null default now()
);

create index orders_user_idx on public.orders (user_id);
create index orders_signature_idx on public.orders (signature_id);

alter table public.orders enable row level security;

-- Users can only read their own orders. Insert/update happen server-side
-- (checkout route + webhook) via the service-role key.
create policy "orders: select own" on public.orders
  for select using (auth.uid() = user_id);
