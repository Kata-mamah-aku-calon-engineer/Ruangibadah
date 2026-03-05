-- Create user_profiles table
create table public.user_profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  location text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_profiles enable row level security;
create policy "Public profiles are viewable by everyone." on user_profiles for select using (true);
create policy "Users can insert their own profile." on user_profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on user_profiles for update using (auth.uid() = id);

-- Create bookmarks table
create table public.bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  surah_number int not null,
  ayah_number int not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.bookmarks enable row level security;
create policy "Users can view own bookmarks." on bookmarks for select using (auth.uid() = user_id);
create policy "Users can insert own bookmarks." on bookmarks for insert with check (auth.uid() = user_id);
create policy "Users can delete own bookmarks." on bookmarks for delete using (auth.uid() = user_id);
create policy "Users can update own bookmarks." on bookmarks for update using (auth.uid() = user_id);

-- Setup Auth Hooks if needed automatically insert profile
-- (Optional: you can do this from the Supabase Dashboard > Authentication > Auth Hooks)
