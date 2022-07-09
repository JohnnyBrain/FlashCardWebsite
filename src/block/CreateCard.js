import {Card} from "./Card.js";
import {FlashCardEdit} from "./FlashCardEdit.js"

export function CreateCard(tempDeck, tempCardList, rightSide){
    var div = document.createElement("div");
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
            const newCard = new Card(front.value, back.value);
            tempCardList.push(FlashCardEdit(newCard, tempDeck, tempCardList, rightSide));
            front.value = "";
            back.value = "";
            front.focus();
        } 
    });

    div.appendChild(createButton);
    //document.body.appendChild(div);
    rightSide.appendChild(div);
}