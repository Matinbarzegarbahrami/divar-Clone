CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone" varchar(11) NOT NULL,
	"logincode" varchar,
	CONSTRAINT "user_phone_unique" UNIQUE("phone"),
	CONSTRAINT "user_logincode_unique" UNIQUE("logincode")
);
