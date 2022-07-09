import {Card} from "./Card.js";
import {Deck} from "./Deck.js";

//Visualizes one flashCard (particularly in study mode)
export function FlashCardView(card, deck){
    //flash Card has front, back, flip button, delete button, star button

    const can = document.createElement("div");
    can.className = "flashCardView";

    const frontSide = document.createElement("h2");
    frontSide.innerHTML = card.getFront();
    can.appendChild(frontSide);
    var front = true;
    
    var flipButton = document.createElement("button");
    flipButton.innerHTML = "FLIP";

    flipButton.addEventListener("click", function(){
        if(front){
            frontSide.innerHTML = card.getBack();
            front = false;
        }
        else{
            frontSide.innerHTML = card.getFront();
            front = true;
        }
        
        
    });
    can.appendChild(flipButton);

    /*var deleteButton = document.createElement("button");
    deleteButton.innerHTML = 'DELETE';
    deleteButton.className = "deleteButton";
    deleteButton.addEventListener("click", function(){
        document.body.removeChild(can);
        deck.removeCardName(card.getFront(), card.getBack());

    });
    can.appendChild(deleteButton);*/

    var starButton = document.createElement("button");
    starButton.innerHTML = 'Star';
    starButton.className = "starButton";

    if(card.getStar()){
        starButton.style.backgroundColor = "gold";
    }
    starButton.addEventListener("click", function(){
        card.setStar();
        if(starButton.style.backgroundColor == "gold"){
            starButton.style.backgroundColor = "";
        }
        else{
            starButton.style.backgroundColor = "gold";
        }
    });
    can.appendChild(starButton);
    //document.body.appendChild(can);
    return can;
}

//export default FlashCardView;