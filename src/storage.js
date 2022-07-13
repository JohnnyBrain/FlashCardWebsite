//to get mysql running in terminal, first turn on the mysql server in system preferences, then in terminal 
// run  'source ~/.bash_profile' then 'mysql -u root -p' then put in password. can use commands such as 
// 'show databases;' or 'use <database name>;' where <database name> is the database name then 'show tables;' to show tables
//  and 'describe <table name>;' to show the fields of the table where <table name> is the table name. 
// use 'SELECT * FROM <table name>;' to show all data in the table, or replace star with specific value to get that row.
// use 'exit;' to exit mysql.


const express = require('express');
const mysql = require('mysql2');

//create connection to server
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'turtle77',
    database: 'nodemysql'
});

const app = express();

app.listen(3000, () => {
    console.log('server running');
});

//sending data from client to server will be done in json format
app.use(express.json({limit: '1mb'}));


app.get('/', function(req, res){
    res.sendFile(__dirname+'/mysqlIndex.html'); // change the path to your index.html
});

//use the index.html (or in this case, the index.css) file in /src
app.use(express.static('src'));

//connect to the server
db.connect(err => {
    if(err){
        console.log('error connecting to server');
    }
    else{
        console.log('SQL connected');
    }
});

//used to update the deck table when creating or editing a deck
app.post('/editDeck', (req, res) => {

    //empties the table
    let sql = `TRUNCATE ${req.body.username}`;
    db.query(sql, (err) =>{
        if(err){
            console.log('error truncating table');
        }
        else{
            console.log('table truncated');
        }
    });

    //stores all the decks in the table
    for(let i = 0; i < req.body.sendDeckList.length; i++){
        var deckNameVal = req.body.sendDeckList[i].name
        for(let j = 0; j < req.body.sendDeckList[i].cardList.length; j++){
            var tempCard = req.body.sendDeckList[i].cardList[j];
            let post = {deckName: deckNameVal, front: tempCard.front, back: tempCard.back, star: tempCard.star};
            let sql = `INSERT INTO ${req.body.username} SET ?`;
            let query = db.query(sql, post, err => {
                if(err){
                    console.log('error inserting data');
                    console.log(err);
                }
                else{
                    console.log('data inserted into deck succesfully');
                }
            });
        }
    }
    console.log(req.body.sendDeckList[0].cardList[0].front);
});

//creates a new account
app.post('/createAccount', (req, res) => {
    if(req.body.username == 'userList'){
        res.json({created: false});
    }
    else{
        let sql = 'SELECT * FROM userList';
        let query = db.query(sql, (err, results) => {
            if(err){
                console.log('error getting data from table');
                console.log('high');
            }
            else{
                console.log(results[0]);
                
                var exists = false;
                for(let i = 0; i < results.length; i++){
                    if(results[i].username == req.body.username){
                        exists = true;
                        break;
                    }
                }
                //if the username already exists, do nothing and tell client that the new user will not be created
                if(exists){
                    res.json({created: false});
                    console.log('false');
                }
                //create new table with the name of the username and tell client that the new user was created
                else{
                    let sql = `CREATE TABLE ${req.body.username}(id int AUTO_INCREMENT, deckName VARCHAR(255), front VARCHAR(255), back VARCHAR(255), star VARCHAR(255), PRIMARY KEY(id))`;
                    db.query(sql, (err) =>{
                        if(err){
                            console.log('error creating table');
                        }
                        else{
                            console.log('table created');
                            res.json({created: true});
                        }
                    });
                    
                    let post = {username: req.body.username, password: req.body.password, deckListName: req.body.username};
                    sql = 'INSERT INTO userList SET ?';
                    let query = db.query(sql, post, err => {
                        if(err){
                            console.log('error inserting data');
                        }
                        else{
                            console.log('data inserted into deck succesfully');
                        }
                    });
                }
            }
        });
    }
});

//logs the user in
app.post('/loginAccount', (req, res) => {
    let sql = 'SELECT * FROM userList';
    let query = db.query(sql, (err, results) => {
        if(err){
            console.log('login error 1');
            console.log('high');
        }
        else{
            console.log(results);
            
            var exists = false;
            for(let i = 0; i < results.length; i++){
                if(results[i].username == req.body.username && results[i].password == req.body.password){
                    exists = true;
                    break;
                }
            }
            //if the username already exists, do nothing and tell client that the new user will not be created
            if(!exists){
                res.json({found: false});
                console.log('false');
            }
            //create new table with the name of the username and tell client that the new user was created
            else{
                var idx = -1;
                let sql = 'SHOW TABLES';
                let query = db.query(sql, (err, results) => {
                    if(err){
                        console.log('login error 2');
                        console.log('high');
                    }
                    else{
                        
                        for(let i = 0; i < results.length; i++){
                            if(results[i].Tables_in_nodemysql == req.body.username){
                                idx = i;
                                break;
                            }
                        }
                        
                        let sql = `SELECT * FROM ${results[idx].Tables_in_nodemysql}`;
                        let query = db.query(sql, (err, rtn) => {
                            if(err){
                                console.log('login error 3');
                                console.log('high');
                            }
                            else{
                                console.log(rtn);
                                res.json(rtn);
                            }
                        });
                    }
                });
            }
        }
    });
});


/*
app.post('loginAccount', (req, res) => {
    let sql = 'SHOW TABLES';
    let query = db.query(sql, (err, results) => {
        if(err){
            console.log('error getting data from table');
            console.log('high');
        }
        else{
            console.log(results[0].Tables_in_nodemysql);
            
            var idx = -1;
            for(let i = 0; i < results.length; i++){
                if(results[i].Tables_in_nodemysql == req.body.username){
                    idx = i;
                    break;
                }
            }
            //if the username already exists, do nothing and tell client that the new user will not be created
            if(idx == -1){
                res.json({found: false});
                console.log('false');
            }
            //create new table with the name of the username and tell client that the new user was created
            else{
                console.log(results[idx]);
            }
        }
    });
});
*/


//create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, err =>{
        if(err){
            console.log('error creating database');
        }
        else{
            console.log('database created');
        }
    });    
});


//create table
app.get('/createTable', (req, res) => {
    let sql = 'CREATE TABLE userList(id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), deckListName VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err) =>{
        if(err){
            console.log('error creating table');
        }
        else{
            console.log('table created');
        }
    });
});

//add data to table
app.get('/insertDeck', (erq, res) => {
    let post = {deckName: 'testDeck', front: 'frontVal', back: 'backVal', star: 'false'};
    let sql = 'INSERT INTO deck SET ?';
    let query = db.query(sql, post, err => {
        if(err){
            console.log('error inserting data');
        }
        else{
            console.log('data inserted into deck succesfully');
        }
    });
});

//select data from table
app.get('/getData', (req, res) => {
    let sql = `SELECT * FROM deck`;
    let query = db.query(sql, (err, results) => {
        if(err){
            console.log('error getting data from table');
        }
        else{
            //console.log(results[0]);
            console.log(results);
        }
    });
});

//update data in table
app.get('/updateData/:id', (req, res) => {
    let newFront = 'newFrontVal';
    let sql = `UPDATE deck SET front = '${newFront}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, err => {
        if(err){
            console.log('error updating data in table');
        }
        else{
            console.log('data in table updated successfully');
        }
    });
});

//delete data in table
app.get('/deleteData/:id', (req, res) => {
    let sql = `DELETE FROM employee WHERE id = $(req.param.id)`;
    let query = db.query(sql, err => {
        if(err){
            console.log('error deleting data from table');
        }
        else{
            console.log('data deleted successfully');
        }
    });
});
