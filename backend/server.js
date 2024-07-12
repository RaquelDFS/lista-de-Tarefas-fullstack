const express = require('express');
const mysql = require('mysql');



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'raquel',
    password: 'My21770?',
    database: 'bd_tasks'
})


const app = new express();
app.listen(3000, () => {
    console.log('Servidor iniciado')
})






//Rotas--------------------------------
app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send(err.message);
        } res.send(results);
    })
})

app.get("/user/:id", (req, res) => {
    let id = req.params.id;
    //Para completo: SELECT * FROM users WHERE id = ?
    connection.query("SELECT id, username, created_at, updated_at FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send(err.message);
        } res.json(results);
    })
})