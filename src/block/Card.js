export class Card{

    constructor(front, back) {
        this.front = front;
        this.back = back;
        this.star = false;
    }

    getFront(){
        return this.front;
    }

    getBack(){
        return this.back;
    }

    getStar(){
        return this.star;
    }

    setFront(front){
        this.front = front;
    }

    setBack(back){
        this.back = back;
    }

    setStar(){
        if(this.star){
            this.star =  false;
        }
        else{
            this.star = true;
        }
    }
}
/*function Card(front, back, star){
    this.front = front;
    this.back = back;
    this.star = star;
    
    Card.prototype.getFront = function() {
        return front;
    }
    Card.prototype.getBack = function() {
        return back;
    }
    Card.prototype.setFront = function(front) {
        this.front = front;
    }
    Card.prototype.setBack = function(back) {
        this.back = back;
    }
}*/

//module.exports =Card;

//export default Card;