CREATE TABLE IF NOT EXISTS "favorite" (
	"id" serial PRIMARY KEY NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
