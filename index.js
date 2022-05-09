// CHAOS BLOG
const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db")
const path = require("path")
const PORT = process.env.PORT || 5001

//process.env.PORT
// process.env.NODE_ENV => production or undefined
// Describes the environment the app will run in



// middleware
app.use(cors())
app.use(express.json());
// This gives us access to request.body


// app.use(express.static("./client/build"))

if (process.env.NODE_ENV === "production") {
    //server static content
    app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(path.join(__dirname, "client/build")); 
// location where index.js file is running


//ROUTES//
//create a post
app.post("/chaos", async (req, res) => {
    try {
        const {description} = req.body;
        // destructuring
        const newChaos = await pool.query("INSERT INTO chaos_post (description) VALUES($1) RETURNING *", [description])
        // inserting the post into the table, and using $1 as a place holder. Then returning all of the data.
        res.json(newChaos.rows[0])
        
    // console.log(req.body);

    } catch (err) {
        console.error(err.message);
    }
})

//get all posts

app.get('/chaos', async (req, res) => {
    try {
        const allChaos = await pool.query("SELECT * FROM chaos_post")
        res.json(allChaos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get a post
app.get('/chaos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const chaos = await pool.query("SELECT * FROM chaos_post WHERE post_id = $1", [id])

        res.json(chaos.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})
//update a post
app.put('/chaos/:id', async (req, res) => {
    try {

      
        const { id } = req.params;
        const { description } = req.body;
        const updateChaos = await pool.query("UPDATE chaos_post SET description = $1 WHERE post_id = $2", [description, id])
        res.json("Chaos was updated!")
        const chaos = await pool.query("SELECT * FROM chaos_post WHERE post_id = $1", [id])

        res.json(chaos.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})


//delete a post
app.delete('/chaos/:id', async (req, res) => {
    try {

      
        const { id } = req.params;
        const deleteChaos = await pool.query("DELETE FROM chaos_post WHERE post_id = $1", [id])
      

        res.json('chaos post was deleted!')
    } catch (err) {
        console.log(err.message);
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
} )


app.listen(PORT, ()=> {
    console.log(`server has started on port ${PORT}`);
})