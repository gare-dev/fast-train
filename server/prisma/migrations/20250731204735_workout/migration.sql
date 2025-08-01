-- CreateTable
CREATE TABLE "exercises_enum" (
    "id_exercise" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "exercise_name" TEXT NOT NULL,
    "muscle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "exercises_enum_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workouts" (
    "id_workout" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "workout_name" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "workouts_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workout_exercises" (
    "id_workout_exercise" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_workout" INTEGER NOT NULL,
    "id_exercise" INTEGER NOT NULL,
    CONSTRAINT "workout_exercises_id_exercise_fkey" FOREIGN KEY ("id_exercise") REFERENCES "exercises_enum" ("id_exercise") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "workout_exercises_id_workout_fkey" FOREIGN KEY ("id_workout") REFERENCES "workouts" ("id_workout") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "workout_sets" (
    "id_set" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_workout_exercise" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    CONSTRAINT "workout_sets_id_workout_exercise_fkey" FOREIGN KEY ("id_workout_exercise") REFERENCES "workout_exercises" ("id_workout_exercise") ON DELETE RESTRICT ON UPDATE CASCADE
);
