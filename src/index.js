

const { response } = require('express');
const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const Datastore = require('nedb');
const argon2 = require('argon2');

const app = express();
app.listen(3000, () => console.log('working!'));
app.use(express.static('src'));
//makes server able to understand incoming data as json.
app.use(express.json({limit: '1mb'}));
//app.use(express.json({strict: false}));
const database = new Datastore('database.db');
database.loadDatabase();

function readDataFile(){
  var sendDeckList = [];
  /*return fs.readFileSync('Data.txt', function(err, data) {
      if(err){
        throw err;
      }
      var deckList = data.toString().split("\n");
      for(i in deckList) {
          //console.log(JSON.parse(deckList[i]).deckList[0].name);
          var tempDeck = JSON.parse(deckList[i]).deckList;
          for(i in tempDeck){
            //var deckName = tempDeck[i].name;
            var newDeck = new Deck(tempDeck[i].name);
            var cardList = tempDeck[i].cardList;
            for(i in cardList){
              var newCard = new Card(cardList[i].front, cardList[i].back);
              newDeck.addCard(newCard);
            }
            sendDeckList.push(newDeck);
            //console.log(newDeck.getName());
            //console.log(newDeck.getCardList());
            //console.log(deckName);
          }
      }
      //console.log(sendDeckList);
      //return sendDeckList;
  });*/
  /*
  return fs.readFileSync('Data.txt', function(err, data) {
    if(err){
      throw err;
    }
    var deckList = data.toString().split("\n");
    for(i in deckList) {
        //console.log(JSON.parse(deckList[i]).deckList[0].name);
        var tempDeck = JSON.parse(deckList[i]).deckList;
        for(i in tempDeck){
          //var deckName = tempDeck[i].name;
          sendDeckList.push([]);
          sendDeckList[i].push(tempDeck[i].name);
          var cardList = tempDeck[i].cardList;
          for(i in cardList){
            sendDeckList[i].push([cardList[i].front, cardList[i].back]);
          }
          //console.log(newDeck.getName());
          //console.log(newDeck.getCardList());
          //console.log(deckName);
        }
        
    }
    //return sendDeckList;
  });
  */
  //console.log(sendDeckList);
  //return sendDeckList;
}


//connects the server to the client to recieve and send data. Request is what the client sends to the server, ie data. 
// the ressponse is what the server sends beck to the client, ie a confirmation upon recieving the data.
app.post('/api', (req, res) => {
  console.log("request recieved");
  console.log(req.body);
  fs.appendFile('./Data.txt', JSON.stringify(/*req.body.time*/ req.body) + "\n", err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  //what is being sent back to the client
  res.json({
    status: 'success',
    DeckList: req.body
  });
});

/*
app.post('/editDeckList', (req, res) => {
  console.log("request recieved");
  console.log(req.body);
  fs.writeFile('./Data.txt', JSON.stringify(/*req.body.time*//* req.body) + "\n", err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  //what is being sent back to the client
  res.json({
    status: 'success',
    DeckList: req.body
  });
});
*/

//ONLY WORKS IF NO TWO USERNAMES ARE THE SAME
app.post('/editDeckList', (req, res) => {
  console.log("request recieved");
  console.log(req.body);
  //database.insert(req.body);
  //database.insert(req.body[0].sendDeckList);

  //what was used before adding hashing
  //database.update({username: req.body.username, password: req.body.password}, req.body);

  const hash = hashPassword(req.body.password).then(rtn => {
    req.body.password = rtn;
    database.update({username: req.body.username}, req.body);
  });

  
  //what is being sent back to the client
  res.json({
    status: 'success',
    DeckList: req.body
  });
});

/*
//sends a response to the client.
app.get('/getData', (req, res) => {
    console.log("good");
    //res.send("high");
    var rtnList = readDataFile();
    console.log(rtnList);
    //rtnList = ['h', 'h'];
    res.send(rtnList);
});
*/

//sends a response to the client.
app.get('/getData', (req, res) => {
  console.log("good");
  //res.send("high");
  database.find({}, (err, data) => {
    if(err){
      console.log(err);
    }
    res.json(data);
    console.log(data[0].sendDeckList[0].name);
  });
  //console.log(rtnList);
  //rtnList = ['h', 'h'];
  //res.send(rtnList);
});

app.post('/login', (req, res) => {
  console.log("good");
  //res.send("high");

  database.find({username: req.body.username}, (err, data) => {
    if(data.length == 0){
      console.log("err");
      console.log(data);
      res.json({});
    }
    else{
      //this is just test stuff you can delete it
      console.log(data[0].password);
      console.log(req.body.password);
      const bing = verifyPassword(data[0].password, req.body.password).then(rtn =>{
        console.log(rtn);
        console.log(data[0]);
      });

      for(let i = 0; i < data.length; i++){
        const verify = verifyPassword(data[i].password, req.body.password).then(rtn => {
          if(rtn){
            res.json([data[i]]);
            console.log('login succesful');

          }
        })
      }
      //res.json(data);
      /*
      console.log(data);
      res.json(data);
      console.log(data[0].sendDeckList[0].name);
      console.log(req.body.username);
      */
    }
  });

  /*
  database.find({username: req.body.username, password: req.body.password}, (err, data) => {
    if(data.length == 0){
      console.log("err");
      console.log(data);
      res.json({});
    }
    else{
      console.log(data);
      res.json(data);
      console.log(data[0].sendDeckList[0].name);
      console.log(req.body.username);
    }
  });
  */
/*
  const hash = hashPassword(req.body.password).then(rtn => {
    console.log(rtn);
    req.body.password = rtn;
    database.find({username: req.body.username, password: req.body.password}, (err, data) => {
      if(data.length == 0){
        console.log("err");
        res.json({});
      }
      else{
        console.log(data);
        res.json(data);
        console.log(data[0].sendDeckList[0].name);
        console.log(req.body.username);
      }
    });
  });
  */

  //console.log(rtnList);
  //rtnList = ['h', 'h'];
  //res.send(rtnList);
});

//hashes the password
async function hashPassword(password){
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    console.log(err);
  }
}

//checks if a hashed password and the normal password are the same and returns as boolean
async function verifyPassword(hashPass, password){
  try {
    const verify = await argon2.verify(hashPass, password);
    return verify;
  } catch (err) {
    console.log(err);
  }
}

app.post('/createAccount', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var newPass;
  const hash = hashPassword(password).then(rtn => {
    console.log(rtn);
    req.body.password = rtn;
    database.insert(req.body);

    const verify = verifyPassword(rtn, password).then(ans => {
      console.log(ans);
    });

    /*res.json({
      username: req.body.username,
      password: rtn
    });*/
  });

  //database.insert(req.body);

  //what is being sent back to the client
  //res.json({
    //status: 'success',
    //DeckList: req.body
  //});
})




//console.log("high");

/*
const fs = require('fs');
const content = 'Some content!';

fs.writeFile('./Data.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
*/

//const myURL = new URL('/foo', 'https://example.org/');

//console.log('good');

