-- Preparation only: apply to a NEW dedicated Supabase project.
-- UI data remains localStorage in this release; these tables are not wired to it.
begin;
create table public.user_roles (user_id uuid primary key references auth.users(id) on delete cascade, role text not null check(role in ('admin','editor')));
alter table public.user_roles enable row level security;
create policy "Read own role" on public.user_roles for select to authenticated using(user_id=auth.uid());
-- No client write policy: trusted SQL alone can assign roles.
create function public.has_staff_role() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.user_roles where user_id=(select auth.uid()) and role in ('admin','editor')); $$;
create function public.is_admin() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.user_roles where user_id=(select auth.uid()) and role='admin'); $$;
revoke all on function public.has_staff_role() from public;
revoke all on function public.is_admin() from public;
grant execute on function public.has_staff_role() to authenticated;
grant execute on function public.is_admin() to authenticated;
create table public.properties (id text primary key,name text not null,location text not null,price numeric not null check(price>0),area numeric not null check(area>0),beds integer not null check(beds>0),status text not null,availability text not null default 'No disponible',image text not null,description text not null,customizable boolean not null default true,published boolean not null default false,is_demo boolean not null default true,created_at timestamptz not null default now());
create table public.projects (id text primary key,name text not null,phase text not null,description text not null,published boolean not null default false,created_at timestamptz not null default now());
create table public.posts (id text primary key,title text not null,category text not null,body text not null,published boolean not null default false,created_at timestamptz not null default now());
create table public.inquiries (id uuid primary key default gen_random_uuid(),kind text not null,name text not null,email text not null,message text not null,status text not null default 'Nueva' check(status in ('Nueva','En revisión','Cerrada')),created_at timestamptz not null default now());
create table public.configurator_options (category text primary key,options jsonb not null check(jsonb_typeof(options)='array'));
alter table public.properties enable row level security;
alter table public.projects enable row level security;
alter table public.posts enable row level security;
alter table public.inquiries enable row level security;
alter table public.configurator_options enable row level security;
create policy "Published properties" on public.properties for select to anon,authenticated using(published);
create policy "Published projects" on public.projects for select to anon,authenticated using(published);
create policy "Published posts" on public.posts for select to anon,authenticated using(published);
create policy "Read options" on public.configurator_options for select to anon,authenticated using(true);
create policy "Staff properties" on public.properties for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Staff projects" on public.projects for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Staff posts" on public.posts for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Admin options" on public.configurator_options for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "Admin inquiries" on public.inquiries for all to authenticated using(public.is_admin()) with check(public.is_admin());
-- No anonymous contact INSERT or storage upload policy. Implement validated,
-- rate-limited endpoints and retention/consent controls before real collection.
commit;
-- After inviting a user, bootstrap using its VERIFIED auth UUID:
-- insert into public.user_roles(user_id,role) values ('<auth-user-uuid>','admin');
