-- WalkTrack initial schema
-- Generated to mirror the initial migration in /database/migrations

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE walks (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  distance NUMERIC(10,2) NOT NULL,
  pace NUMERIC(10,2),
  calories INTEGER,
  route_json JSONB
);

CREATE INDEX walks_user_id_start_time_idx ON walks (user_id, start_time);

CREATE TABLE achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX achievements_user_id_idx ON achievements (user_id);

CREATE TABLE walking_routes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  distance NUMERIC(10,2) NOT NULL,
  user_ratings JSONB NOT NULL DEFAULT '[]'::jsonb
);

CREATE INDEX walking_routes_difficulty_idx ON walking_routes (difficulty);
CREATE INDEX walking_routes_distance_idx ON walking_routes (distance);

CREATE TABLE social_friends (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friend_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  CONSTRAINT social_friends_pk PRIMARY KEY (user_id, friend_id),
  CONSTRAINT social_friends_no_self_friend CHECK (user_id <> friend_id),
  CONSTRAINT social_friends_status_check CHECK (status IN ('pending', 'accepted', 'blocked'))
);

CREATE INDEX social_friends_user_id_status_idx ON social_friends (user_id, status);
CREATE INDEX social_friends_friend_id_status_idx ON social_friends (friend_id, status);
