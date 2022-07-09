import {FlashCardView} from "./FlashCardView.js";
import {ReturnButton} from "./ReturnButton.js";

//Creates the study card page
export function DeckStudy(deck, deckList, rightSide, leftSide){

    var cnt = 0;

    const div = document.createElement("div");

    const buttonArray = document.createElement("div");
    buttonArray.className = "buttonArray";

    //buttonArray.appendChild(ReturnButton(deckList));

    const cardCounter = document.createElement("text");
    function createCardCounter(){
        if(cnt + 1 <= deck.length()){
            cardCounter.innerHTML = "CARD: " + (cnt + 1) + " / " + deck.length();
        }
        else{
            cardCounter.innerHTML = "END";
        }
        cardCounter.className = 'cardcounter';
        //document.body.appendChild(cardCounter);
    }

    if(deck.length() != 0){
        createCardCounter();
    }

    buttonArray.appendChild(cardCounter);
    rightSide.appendChild(buttonArray);

    //prblem with this is that am passing in the getListStarred() list which returns a copy of the true list
    // thus when I edit that list it is not editing the true list
   /* const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete Card";
    document.body.appendChild(deleteButton);
    deleteButton.addEventListener("click", function(){
        if(cnt == 0){
            if(deck.length() == 1){
                deck.removeCard(cnt);
                document.body.removeChild(cardCounter);
                div.innerHTML = "";
                document.body.removeChild(deleteButton);
            }
            else{
                deck.removeCard(cnt);
                cnt--;
                nextButton.click();
            }
        }
        else if(cnt == deck.length() - 1){
            deck.removeCard(cnt);
            prevButton.click();
        }
        else{
            deck.removeCard(cnt);
            cnt--;
            nextButton.click();
        }
    });

    document.body.appendChild(deleteButton);
    */

    var can = FlashCardView(deck.getCard(cnt));


    const nextButton = document.createElement("button");
    nextButton.innerHTML = 'NEXT';
    nextButton.style = "";
    nextButton.className = 'nextButton';
    if(cnt == deck.length() - 1){
        nextButton.style.opacity = "50%";
    }
    nextButton.addEventListener("click", function(){
        if(cnt < deck.length() - 1){
            prevButton.style = "100%";
            div.removeChild(can);
            div.removeChild(nextButton);
            div.removeChild(prevButton);
            //document.body.removeChild(cardCounter);
            cnt++;
            can = FlashCardView(deck.getCard(cnt));
            div.appendChild(can);
            createCardCounter();
            div.appendChild(nextButton);
            div.appendChild(prevButton);
        }
        if(cnt == deck.length() - 1){
            nextButton.style.opacity = "50%";
        }
    });

    const prevButton = document.createElement("button");
    prevButton.innerHTML = 'PREVIOUS';
    prevButton.className = 'nextButton';
    prevButton.style = "";
    prevButton.style.opacity = "50%";
    prevButton.addEventListener("click", function(){
        if(cnt > 0){
            nextButton.style = "100%";
            div.removeChild(can);
            div.removeChild(nextButton);
            div.removeChild(prevButton);
            //document.body.removeChild(cardCounter);
            cnt--;
            can =  FlashCardView(deck.getCard(cnt));
            div.appendChild(can);
            createCardCounter();
            div.appendChild(nextButton);
            div.appendChild(prevButton);
        }
        if(cnt == 0){
            prevButton.style.opacity = "50%";
        }
    });
    div.appendChild(can);
    div.appendChild(nextButton);
    div.appendChild(prevButton);

    rightSide.appendChild(div);
    

    /*if(cnt >= 0 && cnt < deck.length()){
        nextButton.style.marginLeft = "23%";
        prevButton.style.marginLeft = "4%";
        document.body.appendChild(nextButton);
        document.body.appendChild(prevButton);
    }
    else if(cnt < 0){
        nextButton.style.display = "block";
        nextButton.style.marginLeft = "38%";
        document.body.appendChild(nextButton);
    }
    else if(cnt >= deck.length() && deck.length() != 0){
        prevButton.style.display = "block";
        prevButton.style.marginLeft = "38%";
        document.body.appendChild(prevButton);
    }*/

}