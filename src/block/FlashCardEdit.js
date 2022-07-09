import {Card} from "./Card.js";
import {Deck} from "./Deck.js";

//visualizes a card when in edit mode or creating the card
export function FlashCardEdit(card, deck, tempDeck, rightSide){
    var checkDup = false;
    /*if(front.value != '' && back.value != ''){
    for(let k = 0; k < cardList.length; k++){
        if(front.value == cardList[k][0] && back.value == cardList[k][1]){
        checkDup = true;
        }
    }*/

    const newCard = document.createElement("div");
        
    newCard.className = "flashCardEdit";

    const frontSide = document.createElement("textArea");
    frontSide.innerHTML = card.getFront();
    frontSide.className = "a";
    const backSide = document.createElement("textArea");
    backSide.innerHTML = card.getBack();
    backSide.className = "b";
    newCard.appendChild(frontSide);
    newCard.appendChild(backSide);

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = 'DELETE';
    deleteButton.className = "deleteButton";
    deleteButton.addEventListener("mouseover", function(){
        deleteButton.style.backgroundColor = "red";
    });
    deleteButton.addEventListener("mouseout", function(){
        deleteButton.style.backgroundColor = "";
    });
    deleteButton.addEventListener("click", function(){
        deck.removeCardName(card.getFront(), card.getBack());
        //document.body.removeChild(newCard);
        rightSide.removeChild(newCard);
        /*for(let i = 0; i < tempDeck.length; i++){
            if(tempDeck[i] == newCard){
                tempDeck.splice(i, 1);
                break;
            }
        }*/
        tempDeck.splice(tempDeck.indexOf(newCard), 1);
    });
    newCard.appendChild(deleteButton);

    const starButton2 = document.createElement("button");
    starButton2.innerHTML = 'Star';
    starButton2.className = "starButton";
    starButton2.className = "c";
    if(card.getStar()){
        starButton2.style.backgroundColor = "gold";
    }
    starButton2.addEventListener("click", function(){
        card.setStar();
        if(starButton2.style.backgroundColor == "gold"){
            starButton2.style.backgroundColor = "";
        }
        else{
            starButton2.style.backgroundColor = "gold";
        }
    });
    newCard.appendChild(starButton2);


    //document.body.appendChild(newCard);
    rightSide.appendChild(newCard);
    return newCard;  
    
}