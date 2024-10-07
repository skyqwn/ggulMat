DO $$ BEGIN
 CREATE TYPE "public"."post_color" AS ENUM('RED', 'BLUE', 'GREEN', 'PURPLE', 'YELLOW');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "post_color" "post_color";