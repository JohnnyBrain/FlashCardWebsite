import {HomePage} from "./HomePage.js";

export function ReturnButton(deckList){
    const returnButton = document.createElement("button");
    returnButton.innerHTML = "Return";
    returnButton.addEventListener("click", function(){
        document.body.innerHTML = "";
        HomePage(deckList);
    });
     return returnButton;
}