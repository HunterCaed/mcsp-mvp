// // import express from "express";
// // import postgres from "postgres";
// // import morgan from "morgan";


// // // TODO: Uncomment the following two lines.
//\import dotenv from "dotenv";
const dotenv = require('dotenv')
const { Pool } = require('pg');
const { application, json, query } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const client = require('./db')
const morgan = require('morgan')

dotenv.config();
const PORT = process.env.PORT || 4000


const URL = process.env.DATABASE_URL 

// TODO: Replace with process.env.DATABASE_URL
// Format: postgres://USER:PASSWORD@HOST:PORT/DATABASE
//const sql = postgres(URL);

const look = `
SELECT *
FROM task
`;

app.use(morgan("tiny"))
app.use(express.static("public"));
app.use(express.json())


app.route('/task')
    .get(async (req, res) => {  //get all from Database
        try {
            const result = await client.query('SELECT * FROM task')
            res.json(result.rows)
        } catch (err) {
            res.status(500).json({ error: err});
        }     
    })

    .post(async (req, res) => {  //INSERT INTO task (name, age) VALUES ('John', 33); DB Insert
        try {               
                const { taskName, description, completed } = req.body;
                const insert = await client.query('INSERT INTO task (taskName, description, completed) VALUES ($1, $2, $3);', [taskName, description, completed])
                res.json({ success: true, message: `Task Added`}).status(201)
                    
        } catch (err){
            res.status(500).json({ error: err })
        }
              
    })


app.route('/task/:id')

    .get(async (req, res) =>{ //.get with setting a var at /pets/:id //get 1
        try {
                const id = req.params.id     
                const results = await client.query('SELECT * FROM task WHERE id = $1;', [id])
                res.json(results.rows[0])
            }
        catch (err){
            res.status(500).json({ error: err})
        }
    })

    .put(async (req, res) => { // .patch where we are inserting into the json file //UPDATE owners SET age = 30 WHERE name = 'Jane';
        try {
            const { taskName, description, completed } = req.body
            const { id } = req.params    
            await client.query('UPDATE task SET taskName = $1, description = $2, completed = $3 WHERE id = $4', [taskName, description, completed, id])
                
            res.json({ message: `Updated id: ${id} Task name: ${taskName}`}).status(204)
        } catch (err) {
            //res.status(500).type('text/plain').send('Internal Server Error .patch')
            res.status(500).json({err})
        }
    })         
    
    .delete(async (req, res) => {
        try {
            const {id} = req.params
            await client.query('DELETE FROM task WHERE id = $1', [id])
            res.json({ message: `Deleted id: ${id}`}).status(204)
        } catch (err) {
            res.status(500).json({err})
        }
    })

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
