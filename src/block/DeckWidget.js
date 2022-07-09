import {Deck} from "./Deck.js";
import {DeckEdit} from "./DeckEdit.js";
import {DeckStudy} from "./DeckStudy.js";
import {HomePage} from "./HomePage.js";
import { ReturnButton } from "./ReturnButton.js";

//visualizes the deck widget, used on the homepage
export function DeckWidget(deck, deckList, rightSide, leftSide){

    const deckWidget = document.createElement("div");
    deckWidget.className = 'deckWidget';
    
    const deckName = document.createElement("h2");
    deckName.innerHTML = deck.getName();

    const deckSize = document.createElement("label");
    deckSize.innerHTML = "SIZE: " + deck.length();

    const studyButton = document.createElement("button");
    studyButton.innerHTML = 'STUDY';
    studyButton.className = 'widgetButton';

    studyButton.addEventListener("click", function(){
        //document.body.innerHTML = "";
        rightSide.innerHTML = "";

        ReturnButton(deckList);

        var normalStudyButton = document.createElement("button");
        normalStudyButton.innerHTML = "Normal Study";
        normalStudyButton.addEventListener("click", function(){
            //document.body.innerHTML = "";
            rightSide.innerHTML = "";
            DeckStudy(deck.getCardListUnStarred(), deckList, rightSide, leftSide);
        });

        var starStudyButton = document.createElement("button");
        starStudyButton.innerHTML = "Starred Study";
        starStudyButton.addEventListener("click", function(){
            //document.body.innerHTML = "";
            rightSide.innerHTML = "";
            DeckStudy(deck.getCardListStarred(), deckList, rightSide, leftSide);
        });

        //document.body.appendChild(normalStudyButton);
        //document.body.appendChild(starStudyButton);
        rightSide.appendChild(normalStudyButton);
        rightSide.appendChild(starStudyButton);
    });

    const deleteWidget = document.createElement("button");
    deleteWidget.innerHTML = "DELETE";
    deleteWidget.className = "deleteButton2";
    deleteWidget.addEventListener("mouseover", function(){
        deleteWidget.style.backgroundColor = "red";
    });
    deleteWidget.addEventListener("mouseout", function(){
        deleteWidget.style.backgroundColor = "";
    });

    deleteWidget.addEventListener("click", function(){
        for(let i = 0; i < deckList.length; i++){
            if(deckList[i].getName() == deck.getName()){
                deckList.splice(i, 1);
                break;
            }
        }
        //deckList.splice(deckList.indexOf(deck.getName()), 1);
        //document.body.removeChild(deckWidget);
        leftSide.removeChild(deckWidget);
        rightSide.innerHTML = "";
    });

    const editButton = document.createElement("button");
    editButton.innerHTML = "EDIT";
    //editButton.style.marginLeft = "1%";

    editButton.addEventListener("click", function(){
        DeckEdit(deck, deckList, rightSide, leftSide);
    });

    deckWidget.appendChild(deckName);
    deckWidget.appendChild(studyButton);
    deckWidget.appendChild(deleteWidget);
    deckWidget.appendChild(editButton);
    deckWidget.appendChild(deckSize);
    //document.body.appendChild(deckWidget);
    leftSide.appendChild(deckWidget);

    function createReturnButton(){
        const returnButton = document.createElement("button");
        returnButton.innerHTML = "Return";
        returnButton.addEventListener("click", function(){
            document.innerHTML = "";
            HomePage(deckList);
        });
        document.body.appendChild(returnButton);
    }


}