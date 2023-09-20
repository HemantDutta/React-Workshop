const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "587548",
    database: "rw"
});

conn.getConnection((err) => {
    if (err) console.log(err);
    else {
        console.log("MySQL connection Pool Created")
    }
});

const port = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log("The server is running at port: " + port);
});

app.get("/", (req, res) => {
    res.send(`<h1>React Workshop Server</h1>`)
});

app.get("/getUsers", (req, res) => {
    let query = `select * from users`;

    conn.query(query, (err, rows) => {
        if (err) {
            res.send('error');
        } else {
            res.send(rows);
        }
    })
});

app.get("/getID", (req, res) => {
    let query = `select max(id) as curr_id from users`;

    conn.query(query, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rows[0]);
            res.send(rows[0]);
        }
    })
});

app.post("/add-user", (req, res) => {
    let {id, name, email, password} = req.body;
    console.log(id, name, email, password);

    let query = `insert into users values(${id}, '${name}', '${email}', ${password})`;

    conn.query(query, (err) => {
        if (err) res.send("error");
        else res.send("Added");
    })
});

app.post("/curr-user", (req, res) => {
    let {id} = req.body;

    let query = `select * from users where id = ${id}`;

    conn.query(query, (err, rows) => {
        if (err) res.send('error');
        else res.send(rows);
    });
})

app.post("/edit-user", (req, res) => {
    let {id, name, email, password} = req.body;

    let query = `update users set name = '${name}', email = '${email}', password = '${password}' where id = ${id}`;

    conn.query(query, (err)=>{
        if(err) res.send("error");
        else res.send("Updated");
    })
})

app.post("/delete-user", (req,res)=>{
   let {id} = req.body;

   let query = `delete from users where id = ${id}`;

   conn.query(query, (err)=>{
       if (err) res.send("error");
       else res.send("deleted");
   })
});