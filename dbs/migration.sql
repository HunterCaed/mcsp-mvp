DROP TABLE IF EXISTS task;

CREATE TABLE task(
   id SERIAL PRIMARY KEY NOT NULL,
   taskName TEXT NOT NULL,
   description TEXT NOT NULL,
   completed TEXT NOT NULL
   
);
