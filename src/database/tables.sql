CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "urls" (
  "id" SERIAL PRIMARY KEY,
  "url" TEXT NOT NULL,
  "shortUrl" TEXT NOT NULL,
  "visitCount" INTEGER NOT NULL DEFAULT 0,
  "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "sessions" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "users" ("id"),
  "createdAt" TIMESTAMP NOT NULL DEFAULT now()
);