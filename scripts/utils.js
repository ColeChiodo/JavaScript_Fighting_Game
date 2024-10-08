//Created by: Cole Chiodo
//ID: 922775344
//GitHub: ColeChiodo

function RectangleCollision({attacker, defender}){
    return(
        attacker.attackBox.position.x + attacker.attackBox.width >= defender.position.x && 
        attacker.attackBox.position.x <= defender.position.x + defender.width &&
        attacker.attackBox.position.y + attacker.attackBox.height >= defender.position.y && 
        attacker.attackBox.position.y <= defender.position.y + defender.height
    )
}

function determineWinner({p1, p2, timerID}){
    clearTimeout(timerID);
    document.getElementById('resultText').style.display = 'flex';
    if(p1.health > p2.health){
        document.getElementById('resultText').innerHTML = p1.name + ' WINS';
        p1.switchSprite('win');
        p2.switchSprite('loss');
        p1.health = 100;
    }
    else if(p2.health > p1.health){
        document.getElementById('resultText').innerHTML = p2.name + ' WINS';
        p2.switchSprite('win');
        p1.switchSprite('loss');
        p2.health = 100;
    }
    else if(p1.health === p2.health){
        document.getElementById('resultText').innerHTML = 'TIE';
        p1.switchSprite('win');
        p2.switchSprite('win');
        p1.health = 100;
        p2.health = 100;
    }
    setTimeout(() => {
        location.reload();
    }, 2500);
}

let timer = 99;
let timerID;
function decreaseTimer(){
    if(timer > 0){
        timerID = setTimeout(decreaseTimer, 500);
        timer--;
        document.getElementById('timer').innerHTML = timer;
    }
    else{
        determineWinner({p1, p2, timerID});
    }
}