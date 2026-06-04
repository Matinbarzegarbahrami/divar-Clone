CREATE TABLE "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cities_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" varchar(11) NOT NULL,
	"logincode" varchar,
	CONSTRAINT "user_phone_unique" UNIQUE("phone"),
	CONSTRAINT "user_logincode_unique" UNIQUE("logincode")
);
