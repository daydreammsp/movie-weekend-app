# Movie Collection with themoviedb.org API
The app searches for movies based on title and retrieves all related movies and information. The app was made with Angularjs, postgreSQL, and themoviedb.org API. The app also includes Angularjs Material for styling. Postman was used to sandbox and set up routes for the API.


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
