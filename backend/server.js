const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


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

app.use(cors());
app.use(express.json());
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
//Pega tasks por id
app.get("/user/:id/tasks", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send(err.message);
        } res.json(results);
    })
})
//Update de status
app.post("/user/tasks/update_status/", (req, res) => {

    connection.query("UPDATE tasks SET task_status = ?, updated_at = NOW() WHERE id = ? ", [req.body.status, req.body.id_task], (err, results) => {
        if (err) {
            res.send("MySql Connection error.");
        }
    })

    res.json('Ok');

})
