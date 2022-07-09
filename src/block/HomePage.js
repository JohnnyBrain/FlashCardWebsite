import {DeckCreate} from "./DeckCreate.js";
import {DeckWidget} from "./DeckWidget.js";

export function HomePage(deckList, rightSide, leftSide){
    leftSide.innerHTML = "";

    for(let i = 0; i < deckList.length; i++){
        DeckWidget(deckList[i], deckList, rightSide, leftSide);
    }

    const title = document.createElement("h2");
    title.innerHTML = "quizify";
   // document.getElementsByTagName('head')[0].appendChild(title);
   //document.head.appendChild(title);

    const addDeck = document.createElement("button");
    addDeck.innerHTML = "Add Deck";
    addDeck.className = "addDeck";
    //addDeck.style.marginLeft = "15px";
    addDeck.addEventListener("click", function(){
        DeckCreate(deckList, rightSide, leftSide);
    });

    //document.body.appendChild(addDeck);
    leftSide.appendChild(addDeck);
}