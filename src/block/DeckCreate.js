import {Card} from "./Card.js";
import { CreateCard } from "./CreateCard.js";
import {Deck} from "./Deck.js";
import { DeckEdit } from "./DeckEdit.js";
import {FlashCardEdit} from "./FlashCardEdit.js"
import { HomePage } from "./HomePage.js";
import { ReturnButton } from "./ReturnButton.js";


//visualizes the create deck view. used when creating a deck
export function DeckCreate(deckList, rightSide, leftSide){
    //document.body.innerHTML = "";
    rightSide.innerHTML = "";

    var tempDeck = new Deck("TEMP");

    var tempCardList = [];

    const buttonArray = document.createElement("div");
    buttonArray.className = "buttonArray";

    buttonArray.appendChild(ReturnButton(deckList));

    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.addEventListener("click", function(){
        if(nameArea.value != ""){
            /*tempDeck.setName(nameArea.value);
            deckList.push(tempDeck);
            document.body.innerHTML = "";
            HomePage(deckList);*/
            var rtnDeck = new Deck(nameArea.value);
            for(let i = 0; i < tempCardList.length; i++){
                rtnDeck.addCard(new Card(tempCardList[i].getElementsByClassName("a")[0].value, tempCardList[i].getElementsByClassName("b")[0].value));
                if(tempCardList[i].getElementsByClassName("c")[0].style.backgroundColor == "gold"){
                    rtnDeck.getCard(i).setStar();
                }
            }
            deckList.push(rtnDeck);
            //document.body.innerHTML = "";
            rightSide.innerHTML = "";
            HomePage(deckList, rightSide, leftSide);
            DeckEdit(rtnDeck, deckList, rightSide, leftSide);
        }
    });
    buttonArray.appendChild(saveButton);

    const nameArea = document.createElement("textArea");
    buttonArray.appendChild(nameArea);

    rightSide.appendChild(buttonArray);

    /*var div = document.createElement("div");
    div.className = 'cardCreator';
    
    var frontText = document.createElement("label");
    frontText.innerHTML = 'FRONT:   ';
    div.appendChild(frontText);
    var front = document.createElement("textarea");
    div.appendChild(front);
    var br = document.createElement("br");
    
    var backText = document.createElement("label");
    backText.innerHTML = 'BACK:   ';
    backText.className = "backtext";
    div.appendChild(backText);
    var back = document.createElement("textarea");
    div.appendChild(back);
    div.appendChild(br);

    var createButton = document.createElement("button");
    createButton.innerHTML = 'Create Card';
    
    //when creating a new card while editing
    createButton.addEventListener("click", function(){
        if(front.value != '' && back.value != ''){
            //if(!deck.cardExists(front.value, back.value)){
                //const newCard = new Card(front.value, back.value);
                //FlashCardEdit(newCard, deck);
                //deck.addCard(newCard);
                //front.value = '';
                //back.value = '';
            //}
            const newCard = new Card(front.value, back.value);
            //FlashCardEdit(newCard, tempDeck);
            tempCardList.push(FlashCardEdit(newCard, tempDeck, tempCardList));
            front.value = "";
            back.value = "";
            front.focus();
            //tempDeck.addCard(newCard);
        } 
        //const newCard = new Card(front.value, back.value);
        //FlashCardEdit(newCard, deck);
    });

    /*createButton.addEventListener("click", function(){
      if(front.value != '' && back.value != ''){
        front.value = '';
        back.value = '';
      } 
    });*/ 

    /*for(let i = 0; i < deck.length(); i++){
        FlashCardEdit(deck.getCard(i), deck);
    }*//*

    div.appendChild(createButton);
    document.body.appendChild(div);*/

    CreateCard(tempDeck, tempCardList, rightSide);
}