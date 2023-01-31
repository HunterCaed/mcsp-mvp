// // import express from "express";
// // import postgres from "postgres";
// // import morgan from "morgan";


// // // TODO: Uncomment the following two lines.
// import dotenv from "dotenv";


const { Pool } = require('pg');
const { application, json, query } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const client = require('./db')
//const petsPath = path.join(_dirname, 'pets.json')

const PORT = process.env.PORT || 4000
dotenv.config();

const URL = process.env.DATABASE_URL  //postgres://benrichardson:L6jggpD7m2GeSdr1q3Z65yhR4Mf94Uol@dpg-cfa0ks2rrk01l41smmdg-a.oregon-postgres.render.com/example_db_bqjf?ssl=true

// TODO: Replace with process.env.DATABASE_URL
// Format: postgres://USER:PASSWORD@HOST:PORT/DATABASE
const sql = postgres(URL);

app.use(morgan("tiny"))

app.use(express.static("public"));
app.use(express.json())





app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
