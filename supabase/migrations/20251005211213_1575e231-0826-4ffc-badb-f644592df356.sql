-- إنشاء نوع enum للأدوار
create type public.app_role as enum ('admin', 'user');

-- جدول الملفات الشخصية
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- تفعيل RLS على profiles
alter table public.profiles enable row level security;

-- سياسات RLS لجدول profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- جدول أدوار المستخدمين
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

-- تفعيل RLS على user_roles
alter table public.user_roles enable row level security;

-- دالة للتحقق من الدور
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- سياسات RLS لجدول user_roles
create policy "Users can view their own roles"
  on public.user_roles for select
  using (auth.uid() = user_id);

create policy "Admins can view all roles"
  on public.user_roles for select
  using (public.has_role(auth.uid(), 'admin'));

-- جدول بصمات الكف
create table public.palm_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  scan_data jsonb not null,
  qr_code text,
  status text default 'active' check (status in ('active', 'expired', 'revoked')),
  verified_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- تفعيل RLS على palm_scans
alter table public.palm_scans enable row level security;

-- سياسات RLS لجدول palm_scans
create policy "Users can view their own scans"
  on public.palm_scans for select
  using (auth.uid() = user_id);

create policy "Users can insert their own scans"
  on public.palm_scans for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own scans"
  on public.palm_scans for update
  using (auth.uid() = user_id);

create policy "Admins can view all scans"
  on public.palm_scans for select
  using (public.has_role(auth.uid(), 'admin'));

-- دالة لإنشاء ملف شخصي تلقائياً عند التسجيل
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

-- trigger لإنشاء الملف الشخصي تلقائياً
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- دالة لتحديث updated_at
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- triggers لتحديث updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

create trigger update_palm_scans_updated_at
  before update on public.palm_scans
  for each row execute procedure public.update_updated_at_column();