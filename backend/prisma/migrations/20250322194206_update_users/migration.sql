-- CreateTable
CREATE TABLE "Users" (
    "telegram_user_id" INTEGER NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "language_code" TEXT NOT NULL,
    "allows_write_to_pm" BOOLEAN NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("telegram_user_id")
);
