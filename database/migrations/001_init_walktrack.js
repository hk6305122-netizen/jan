exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "bigserial", primaryKey: true },
    name: { type: "text", notNull: true },
    email: { type: "text", notNull: true },
    password_hash: { type: "text", notNull: true },
    created_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });

  pgm.addConstraint("users", "users_email_unique", {
    unique: ["email"],
  });

  pgm.createTable("walks", {
    id: { type: "bigserial", primaryKey: true },
    user_id: {
      type: "bigint",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    start_time: { type: "timestamptz", notNull: true },
    end_time: { type: "timestamptz" },
    distance: { type: "numeric(10,2)", notNull: true },
    pace: { type: "numeric(10,2)" },
    calories: { type: "integer" },
    route_json: { type: "jsonb" },
  });

  pgm.createIndex("walks", ["user_id", "start_time"], {
    name: "walks_user_id_start_time_idx",
  });

  pgm.createTable("achievements", {
    id: { type: "bigserial", primaryKey: true },
    user_id: {
      type: "bigint",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    badge_type: { type: "text", notNull: true },
    unlocked_at: { type: "timestamptz", notNull: true, default: pgm.func("now()") },
  });

  pgm.createIndex("achievements", ["user_id"], {
    name: "achievements_user_id_idx",
  });

  pgm.createTable("walking_routes", {
    id: { type: "bigserial", primaryKey: true },
    name: { type: "text", notNull: true },
    difficulty: { type: "text", notNull: true },
    distance: { type: "numeric(10,2)", notNull: true },
    user_ratings: { type: "jsonb", notNull: true, default: "'[]'::jsonb" },
  });

  pgm.createIndex("walking_routes", ["difficulty"], {
    name: "walking_routes_difficulty_idx",
  });
  pgm.createIndex("walking_routes", ["distance"], {
    name: "walking_routes_distance_idx",
  });

  pgm.createTable("social_friends", {
    user_id: {
      type: "bigint",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    friend_id: {
      type: "bigint",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    status: { type: "text", notNull: true, default: "'pending'" },
  });

  pgm.addConstraint("social_friends", "social_friends_pk", {
    primaryKey: ["user_id", "friend_id"],
  });

  pgm.addConstraint("social_friends", "social_friends_no_self_friend", {
    check: "user_id <> friend_id",
  });

  pgm.addConstraint("social_friends", "social_friends_status_check", {
    check: "status in ('pending', 'accepted', 'blocked')",
  });

  pgm.createIndex("social_friends", ["user_id", "status"], {
    name: "social_friends_user_id_status_idx",
  });

  pgm.createIndex("social_friends", ["friend_id", "status"], {
    name: "social_friends_friend_id_status_idx",
  });
};

exports.down = (pgm) => {
  pgm.dropTable("social_friends");
  pgm.dropTable("walking_routes");
  pgm.dropTable("achievements");
  pgm.dropTable("walks");
  pgm.dropTable("users");
};
