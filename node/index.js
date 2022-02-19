const express = require('express')
const app = express()

const port = 3000

const config = {
    host: 'db',
    user: 'root',
    passowrd: '',
    database: 'nodedb'
};

const mysql = require('mysql');

const connection = mysql.createConnection(config);

const sql_create_table = `create table if not exists people(id int not null auto_increment, name varchar(50));`;
connection.query(sql_create_table);


const sql = `INSERT INTO people(name) values ('Igor')`;
connection.query(sql);

connection.end();


app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log('Rodando na porta ' + port);

});

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);
   
    const sql_get_names = `SELECT name FROM people`;
    connection.query(sql_get_names, (err, rows, fields) => {
        res.render('index.ejs', { data: rows });
    });

    connection.end();
});



