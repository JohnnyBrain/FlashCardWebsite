
const express = require('express');

const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: ''
});

const app = express();

app.listen(3000, () => {
    console.log('server running');
});

db.connect(err => {
    if(err){
        console.log(err);
    }
    console.log('SQL connecnted');
});

app.get