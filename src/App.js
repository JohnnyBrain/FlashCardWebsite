import {Card} from "./block/Card.js";
import {Deck} from "./block/Deck.js";
import {FlashCardView} from "./block/FlashCardView.js";
import {FlashCardEdit} from "./block/FlashCardEdit.js";
import {DeckStudy} from "./block/DeckStudy.js";
import { HomePage } from "./block/HomePage.js";
//import React, { Component } from "react";

var deckList = [];
const row = document.createElement('div');
const leftSide = document.createElement('div');
const rightSide = document.createElement('div');

export function App(){

    /*const spanish = new Deck("spanish");
    spanish.addCard(new Card("greetings", "hello"));
    spanish.addCard(new Card("see ya", "goodbye"));
    spanish.addCard(new Card("thanks", "goodbye"));
    */
    
    //FlashCardView(spanish.getCard(0), spanish);
    /*FlashCardView(spanish.getCard(1), spanish);
    FlashCardEdit(spanish.getCard(1), spanish);
    FlashCardCreate(spanish);*/

    /*
    DeckStudy(spanish);

    const test = document.createElement("label");

    test.innerHTML = spanish.length();

    document.body.appendChild(test);
    */

    //const spanish = new Deck("spanish");
    //spanish.addCard(new Card("greetings", "hello"));
    //spanish.addCard(new Card("see ya", "goodbye"));
    //spanish.addCard(new Card("thanks", "goodbye"));

    //deckList.push(spanish);

    //const a = [];
    //a.push(FlashCardEdit(spanish.getCard(0), spanish));

    //a[0].getElementsByClassName("a")[0].value = "high";

    row.className = 'row';


    leftSide.className = "leftSide";

    rightSide.className = "rightSide";

    row.appendChild(leftSide);
    row.appendChild(rightSide);

    //leftSide.appendChild(HomePage(deckList, rightSide, leftSide));
    //HomePage(deckList, rightSide, leftSide)
    //document.body.appendChild(row);
    return row;

    //HomePage(deckList);

  /*render() {
    return (<div>Hello World</div>);
  }*/

  /*
    const http = require('http');

    const port = process.env.PORT || 3000;

    const server = http.createServer((req, res) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end('<h1>Hello, World!</h1>')
    });

    server.listen(port, () => {
        
    });
*/

    

}


//export default App;