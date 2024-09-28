DO $$ BEGIN
 CREATE TYPE "public"."users_loginType" AS ENUM('email', 'kakao', 'apple');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"users_loginType" "users_loginType" DEFAULT 'email' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
