-- =====================================
-- PARADISE REAL ESTATE DATABASE
-- Lust Cherry & Gray Edition 🍒
-- =====================================

create extension if not exists "pgcrypto";

-- پروفایل کاربران
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    phone text,
    role text default 'agent',
    created_at timestamptz default now()
);

-- مشاوران املاک
create table if not exists public.agents (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text,
    email text,
    role text default 'agent',
    description text,
    created_at timestamptz default now()
);

-- مشتریان
create table if not exists public.customers (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text,
    customer_type text,
    deal text,
    budget numeric default 0,
    desired_area text,
    description text,
    created_at timestamptz default now()
);

-- املاک
create table if not exists public.properties (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    type text,
    deal text,
    area numeric default 0,
    rooms integer default 0,
    floor integer,
    building_age integer,
    parking boolean default false,
    storage boolean default false,
    elevator boolean default false,
    price numeric default 0,
    deposit numeric default 0,
    rent numeric default 0,
    address text,
    owner text,
    phone text,
    description text,
    map_url text,
    status text default 'available',
    created_by uuid references auth.users(id),
    created_at timestamptz default now()
);

-- تنظیمات برنامه
create table if not exists public.app_settings (
    id uuid primary key default gen_random_uuid(),
    setting_key text unique not null,
    setting_value jsonb,
    updated_at timestamptz default now()
);

-- ساخت خودکار پروفایل هنگام ثبت نام
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (id, full_name)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'full_name', '')
    )
    on conflict (id) do nothing;

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- فعال‌سازی امنیت جداول
alter table public.profiles enable row level security;
alter table public.agents enable row level security;
alter table public.customers enable row level security;
alter table public.properties enable row level security;
alter table public.app_settings enable row level security;

-- حذف سیاست‌های قبلی
drop policy if exists "profiles_select" on public.profiles;
drop policy if exists "profiles_update" on public.profiles;
drop policy if exists "agents_all" on public.agents;
drop policy if exists "customers_all" on public.customers;
drop policy if exists "properties_all" on public.properties;
drop policy if exists "settings_all" on public.app_settings;

-- کاربران فقط پروفایل خودشان را ببینند و ویرایش کنند
create policy "profiles_select"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "profiles_update"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

-- اطلاعات مشترک برای اعضای واردشده پارادایس
create policy "agents_all"
on public.agents for all
to authenticated
using (true)
with check (true);

create policy "customers_all"
on public.customers for all
to authenticated
using (true)
with check (true);

create policy "properties_all"
on public.properties for all
to authenticated
using (true)
with check (true);

create policy "settings_all"
on public.app_settings for all
to authenticated
using (true)
with check (true);

-- پایان نصب پایگاه داده پارادایس
