//Created by: Cole Chiodo
//ID: 922775344
//GitHub: ColeChiodo

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const maxJumps = 2;

const gravity = 0.3;
const speed = 5;
const jumpHeight = -10;

const height = 150;

const bg = new Sprite({
    position: {x: 0, y: 0},
    imageSrc: './images/background.png',
    scale: 1.75,
    framesMax: 8,
    framesHold: 20
});

const player1Character = 'Akiha';
const player2Character = 'Akiha';

if(player1Character === 'Akiha'){
    var p1Sprite = './images/Akiha/';
}

if(player2Character === 'Akiha'){
    var p2Sprite = './images/Akiha/';
}

const p1 = new Character({
    name: 'PLAYER 1',
    position: {x: canvas.width * (1/6) - 50, y: canvas.height - (height + 50)},
    velocity: {x: 0, y: 0},
    color: 'blue',
    imageSrc: p1Sprite + 'idle.png',
    scale: 1.75,
    framesMax: 12,
    offset: {x: 0, y: 225},
    sprites: {
        idle: {
            imageSrc: p1Sprite + 'idle.png',
            framesMax: 12
        },
        walkf: {
            imageSrc: p1Sprite + 'walkf.png',
            framesMax: 12
        },
        walkb: {
            imageSrc: p1Sprite + 'walkb.png',
            framesMax: 12
        },
        jump: {
            imageSrc: p1Sprite + 'jump.png',
            framesMax: 8
        },
        jump2: {
            imageSrc: p1Sprite + 'jump2.png',
            framesMax: 5
        },
        fall: {
            imageSrc: p1Sprite + 'fall.png',
            framesMax: 3
        },
        land: {
            imageSrc: p1Sprite + 'land.png',
            framesMax: 3
        },
        crouch: {
            imageSrc: p1Sprite + 'crouch.png',
            framesMax: 1
        },
        attacks: {
            imageSrc: p1Sprite + 'attacks.png',
            framesMax: 9
        },
        attacka: {
            imageSrc: p1Sprite + 'attacka.png',
            framesMax: 9
        },
        attackc: {
            imageSrc: p1Sprite + 'attackc.png',
            framesMax: 13
        },
        blocks: {
            imageSrc: p1Sprite + 'blocks.png',
            framesMax: 3
        },
        blockc: {
            imageSrc: p1Sprite + 'blockc.png',
            framesMax: 3
        },
        win: {
            imageSrc: p1Sprite + 'win.png',
            framesMax: 8
        },
        loss: {
            imageSrc: p1Sprite + 'loss.png',
            framesMax: 14
        }
    }
});

const p2 = new Character({
    name: 'PLAYER 2',
    position: {x: canvas.width * (5/6), y: canvas.height - (height + 50)},
    velocity: {x: 0, y: 0},
    color: 'red',
    imageSrc: p2Sprite + 'idle.png',
    scale: 1.75,
    framesMax: 12,
    offset: {x: 0, y: 225},
    sprites: {
        idle: {
            imageSrc: p2Sprite + 'idle.png',
            framesMax: 12
        },
        walkf: {
            imageSrc: p2Sprite + 'walkf.png',
            framesMax: 12
        },
        walkb: {
            imageSrc: p2Sprite + 'walkb.png',
            framesMax: 12
        },
        jump: {
            imageSrc: p2Sprite + 'jump.png',
            framesMax: 8
        },
        jump2: {
            imageSrc: p2Sprite + 'jump2.png',
            framesMax: 5
        },
        fall: {
            imageSrc: p2Sprite + 'fall.png',
            framesMax: 3
        },
        land: {
            imageSrc: p2Sprite + 'land.png',
            framesMax: 3
        },
        crouch: {
            imageSrc: p2Sprite + 'crouch.png',
            framesMax: 1
        },
        attacks: {
            imageSrc: p2Sprite + 'attacks.png',
            framesMax: 9
        },
        attacka: {
            imageSrc: p2Sprite + 'attacka.png',
            framesMax: 9
        },
        attackc: {
            imageSrc: p2Sprite + 'attackc.png',
            framesMax: 13
        },
        blocks: {
            imageSrc: p2Sprite + 'blocks.png',
            framesMax: 3
        },
        blockc: {
            imageSrc: p2Sprite + 'blockc.png',
            framesMax: 3
        },
        win: {
            imageSrc: p2Sprite + 'win.png',
            framesMax: 8
        },
        loss: {
            imageSrc: p2Sprite + 'loss.png',
            framesMax: 14
        }
    }
});

document.getElementById('p1name').innerHTML = p1.name;
document.getElementById('p2name').innerHTML = p2.name;

const keys = {
    //player 1 controls
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    f: {
        pressed: false
    },
    g: {
        pressed: false
    },

    //player 2 controls
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    k: {
        pressed: false
    },
    l: {
        pressed: false
    }
}

decreaseTimer();

function animate(){
    window.requestAnimationFrame(animate);

    if(p1.position.x > p2.position.x){
        p1.side = 'right';
        p2.side = 'left';
    }
    else{
        p1.side = 'left';
        p2.side = 'right';
    }

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    bg.update();
    p1.update();
    p2.update(); 

    //player 1 movement
    p1.velocity.x = 0;
    if(!p1.isCrouching && !p1.isBlocking && !p1.isAttacking && !p1.isStartup){
        if(keys.a.pressed && p1.lastKey === 'a'){
            if(p1.position.x > 0){
                p1.velocity.x = -1 * p1.speed;
                if(p1.isGrounded){
                    if(p1.side === 'right'){
                        p1.switchSprite('walkf');
                    }
                    else{
                        p1.switchSprite('walkb');
                    }
                }
            }
        }
        else if(keys.d.pressed && p1.lastKey === 'd'){
            if(p1.position.x + p1.width < canvas.width){
                p1.velocity.x = p1.speed;
                if(p1.isGrounded){
                    if(p1.side === 'right'){
                        p1.switchSprite('walkb');
                    }
                    else{
                        p1.switchSprite('walkf');
                    }
                }
            }
        }
        else if(p1.isGrounded){
            p1.switchSprite('idle');
        }
    } else if(p1.isCrouching && !p1.isBlocking && !p1.isAttacking && !p1.isStartup){
        p1.switchSprite('crouch');
    }

    if(!p1.isCrouching && keys.s.pressed && p1.isGrounded){
        p1.isCrouching = true;
        p1.height = 75;
        p1.position.y += 75;
        p1.offset.y += 75;
    }

    //player 2 movement
    p2.velocity.x = 0;
    if(!p2.isCrouching && !p2.isBlocking && !p2.isAttacking && !p2.isStartup){
        if(keys.ArrowLeft.pressed && p2.lastKey === 'ArrowLeft'){
            if(p2.position.x > 0){
                p2.velocity.x = -1 * p2.speed;
                if(p2.isGrounded){
                    if(p2.side === 'right'){
                        p2.switchSprite('walkf');
                    }
                    else{
                        p2.switchSprite('walkb');
                    }
                }
            }
        }
        else if(keys.ArrowRight.pressed && p2.lastKey === 'ArrowRight'){
            if(p2.position.x + p2.width < canvas.width){
                p2.velocity.x = p2.speed;
                if(p2.isGrounded){
                    if(p2.side === 'right'){
                        p2.switchSprite('walkb');
                    }
                    else{
                        p2.switchSprite('walkf');
                    }
                }
            }
        }
        else if(p2.isGrounded){
            p2.switchSprite('idle');
        }
    } else if(p2.isCrouching && !p2.isBlocking && !p2.isAttacking && !p2.isStartup){
        p2.switchSprite('crouch');
    }
    
    if(!p2.isCrouching && keys.ArrowDown.pressed && p2.isGrounded){
        p2.isCrouching = true;
        p2.height = 75;
        p2.position.y += 75;
        p2.offset.y += 75;
    }

    //detect collision
    if (
    RectangleCollision({attacker: p1, defender: p2}) &&
    p1.isAttacking)
    {
        p1.isAttacking = false;
        p2.hit(p1.attackType);
        if(p2.health === 1){
            document.querySelector('#p2Health').style.width = p2.health * 100 + '%';
        }
        else{
            document.querySelector('#p2Health').style.width = p2.health + '%';
        }
    }

    if (
    RectangleCollision({attacker: p2, defender: p1}) &&
    p2.isAttacking)
    {
        p2.isAttacking = false;
        p1.hit(p2.attackType);
        if(p1.health === 1){
            document.querySelector('#p1Health').style.width = p1.health * 100 + '%';
        }
        else{
            document.querySelector('#p1Health').style.width = p1.health + '%';
        }
    }

    if(p1.health <= 0 || p2.health <= 0){
        determineWinner({p1, p2, timerID});
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch(event.key){
        //player 1 controls
        case 'a':
            keys.a.pressed = true;
            p1.lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            p1.lastKey = 'd';
            break;
        case 'w':
            keys.w.pressed = true;
            p1.jump();
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'f':
            if(!p1.isBlocking){
                keys.f.pressed = true;
                p1.attack();
            }
            break;
        case 'g':
            keys.g.pressed = true;
            p1.block();
            break;

        //player 2 controls
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            p2.lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            p2.lastKey = 'ArrowRight';
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            p2.jump();
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            break;
        case 'k':
            if(!p2.isBlocking){
                keys.k.pressed = true;
                p2.attack();
            }
            break;
        case 'l':
            keys.l.pressed = true;
            p2.block();
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        //player 1 controls
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            if(p1.isGrounded){
                p1.isCrouching = false;
                p1.height = height;
                p1.position.y -= 75;
                p1.offset.y -= 75;
            }
            break;
        case 'f':
            keys.f.pressed = false;
            break;
        case 'g':
            keys.g.pressed = false;
            p1.isBlocking = false;
            break;

        //player 2 controls
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            if(p2.isGrounded){
                p2.isCrouching = false;
                p2.height = height;
                p2.position.y -= 75;
                p2.offset.y -= 75;
            }
            break;
        case 'k':
            keys.k.pressed = false;
            break;
        case 'l':
            keys.l.pressed = false;
            p2.isBlocking = false;
            break;
    }
});