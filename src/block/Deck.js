import {Card} from "./Card.js";

export class Deck{

    constructor(name){
        this.name = name;
        this.cardList = [];
    }

    length(){
        return this.cardList.length;
    }

    getName(){
        return this.name;
    }

    setName(name){
       this.name = name;
    }

    getCardList(){
        return this.cardList;
    }

    getCardListUnStarred(){
        var temp = new Deck(this.name);
        for(let i = 0; i < this.cardList.length; i++){
            if(!this.cardList[i].getStar()){
                temp.addCard(this.cardList[i]);
            }
        }
        return temp;
    }

    getCardListStarred(){
        var temp = new Deck(this.name);
        for(let i = 0; i < this.cardList.length; i++){
            if(this.cardList[i].getStar()){
                temp.addCard(this.cardList[i]);
            }
        }
        return temp;
    }

    addCard(card){
        this.cardList.push(card);
    }

    removeCard(idx){
        if(idx < 0 || idx >= this.cardList.length){
            throw new Error("idx not in cardList");
        }
        this.cardList.splice(idx, 1);
    }

    removeCardName(front, back){
        for(let i = 0; i < this.cardList.length; i++){
            if(this.cardList[i].getFront() == front 
            && this.cardList[i].getBack() == back){
                this.cardList.splice(i, 1);
                break;
            }
        }
    }

    getCard(idx){
        if(idx < 0 || idx >= this.cardList.length){
            throw new Error("idx not in cardList");
        }
        return this.cardList[idx];
    }

    getCardName(front, back){
        for(let i = 0; i < this.cardList.length; i++){
            if(this.cardList[i].getFront() == front 
            && this.cardList[i].getBack() == back){
                return this.cardList.getCard(i);
            }
        }
    }

    cardExists(front, back){
        for(let i = 0; i < this.cardList.length; i++){
            if(this.cardList[i].getFront() == front 
            && this.cardList[i].getBack() == back){
                return true;
            }
        }
        return false;
    }
}