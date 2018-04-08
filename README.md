# movie-weekend-app


Database table

CREATE TABLE "movies" (
	"id" serial primary key,
	"title" varchar(80),
	"genre" varchar(80),
	"date" varchar(80),
	"rating" varchar(80),
	"url" varchar(80),
	"overview" varchar(240)
	
	
);

CREATE TABLE "genres" (
	"id" serial primary key,
	"url" varchar(80),
	"genre" varchar(80)
	
	
);
