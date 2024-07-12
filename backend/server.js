const express = require('express');
const mysql = require('mysql');

const port = process.env.PORT || 3000;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'raquel',
    password: 'My21770?',
    database: 'bd_tasks'
})


const app = new express();
app.listen(port, () => {
    console.log('Servidor iniciado')
})

app.get("/", (req, res) => {
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send(err.message);
        } res.send(results);
    })
})