//Created by: Cole Chiodo
//ID: 922775344
//GitHub: ColeChiodo

class Sprite{
    constructor({ position , imageSrc, scale = 1, framesMax = 1, framesHold = 10, framesCurrent = 0, framesEnlapsed = 0, offset = {x: 0, y: 0}, side }){
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurrent = framesCurrent;
        this.framesEnlapsed = framesEnlapsed;
        this.framesHold = framesHold;
        this.offset = offset;
        this.side = side;
    }

    draw(){
        if(this.side === 'right'){
            c.save();
            c.scale(-1, 1);
            c.drawImage(
                this.image,
                this.frameCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                -this.position.x - 255,
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale,
                (this.image.height) * this.scale
            );
            c.restore();
        }
        else{
            c.drawImage(
                this.image,
                this.frameCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x - 200,
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale,
                (this.image.height) * this.scale
            );
        }
    }

    nextFrame(){
        if(this.frameCurrent < this.framesMax - 1){
            this.frameCurrent++;
        }
        else{
            this.frameCurrent = 0;
        }
    }

    update(){
        this.draw();
        this.animateFrames();
    }

    animateFrames(){
        this.framesEnlapsed++;

        if(this.framesEnlapsed % this.framesHold === 0){
            this.nextFrame();
        }
    }
}

class Character extends Sprite{
    constructor({ name , position, velocity, color, imageSrc, scale = 1, framesCurrent = 0, framesMax = 1, framesHold = 10, framesEnlapsed = 0, offset = {x: 0, y: 0}, sprites, side = 'left' }){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            framesHold,
            framesCurrent,
            framesEnlapsed,
            offset,
            side
        });
        this.name = name;
        this.height = 150;
        this.width = 50;
        this.velocity = velocity;
        this.speed = speed;
        this.color = color;

        this.lastKey;

        this.isCrouching = false;
        this.isAttacking = false;
        this.isGrounded = false;
        this.isBlocking = false;
        this.isStartup = false;

        this.canMove = true;

        this.sprites = sprites;
        for(const sprite in this.sprites){
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }

        this.side = side;

        this.jumpCount = 0;
        this.health = 1;

        this.attackBox = {
            position: {x: this.position.x, y: this.position.y},
            offset,
            width: 174,
            height: 35
        };

        this.attackType;
        this.blockType;
    }

    update(){
        this.draw();
        this.animateFrames();

        //draw devTools
        //this.drawHitbox();

        if(this.attackType === 'mid'){
            if(this.side === 'right'){
                this.attackBox.offset.x = 124;
            }
            else{
                this.attackBox.offset.x = 0;
            }
            this.attackBox.height = 35;
            this.attackBox.width = 174;
            this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
            this.attackBox.position.y = this.position.y + (this.height / 2);
        }
        else if(this.attackType === 'high'){
            if(this.side === 'right'){
                this.attackBox.offset.x = 124;
            }
            else{
                this.attackBox.offset.x = 0;
            }
            this.attackBox.height = 125;
            this.attackBox.width = 125;
            this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
            this.attackBox.position.y = this.position.y + 25;
        }
        else if(this.attackType === 'low'){
            if(this.side === 'right'){
                this.attackBox.offset.x = 175;
            }
            else{
                this.attackBox.offset.x = -100;
            }
            this.attackBox.height = 125;
            this.attackBox.width = 125;
            this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
            this.attackBox.position.y = this.position.y + 25;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //gravity
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 50){
            this.velocity.y = 0;
            this.isGrounded = true;
            this.jumpCount = 0;
        }
        else{
            if(this.velocity.y > 0 && (!this.isStartup && !this.isAttacking)){
                this.switchSprite('fall');
            }
            this.velocity.y += gravity;
            this.isGrounded = false;
        }

        if(this.isBlocking){
            if(this.isCrouching){
                this.blockType = 'low';
                this.switchSprite('blockc');
            }
            else{
                this.blockType = 'mid';
                this.switchSprite('blocks');
            }
        }
    }

    jump(){
        if(this.jumpCount < maxJumps && !this.isBlocking){
            this.jumpCount++;
            if(this.jumpCount === 1){
                this.isGrounded = !this.isGrounded;
                this.switchSprite('jump');
                this.velocity.y = jumpHeight
            }
            else{
                this.switchSprite('jump2');
                this.velocity.y = jumpHeight;
            }
        }
    }

    attack(){
        if(this.isAttacking || this.isStartup || this.isBlocking){
            return;
        }
        this.isStartup = true;

        let animationDuration;

        if(this.isCrouching){
            setTimeout(() => {
                this.isAttacking = true;
            }, 300);
            this.attackType = 'low';
            this.switchSprite('attackc');
            animationDuration = 900;
        }
        else if(!this.isGrounded){
            setTimeout(() => {
                this.isAttacking = true;
            }, 300);
            this.attackType = 'high';
            this.switchSprite('attacka');
            animationDuration = 600;
        }
        else{
            setTimeout(() => {
                this.isAttacking = true;
            }, 300);
            this.attackType = 'mid';
            this.switchSprite('attacks');
            animationDuration = 600;
        }
        setTimeout(() => {
            this.isAttacking = false;
            this.isStartup = false;
        }, animationDuration);
    }

    drawHitbox(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        //attack box
        if(this.isAttacking){
            c.fillStyle = 'limegreen';
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    block(){
        if(this.isGrounded && !this.isAttacking && !this.isStartup){
            this.isBlocking = true;
            if(this.isCrouching){
                this.blockType = 'low';
            }
            else{
                this.blockType = 'mid';
            }
        }
    }

    knockback(){
        if(this.side === 'right'){
            if(this.position.x + this.width < canvas.width){
                this.position.x += 10;
            }
        }
        else{
            if(this.position.x > 0){
                this.position.x -= 10;
            }
        }
    }

    hit(enemyAttackType){
        if(this.isBlocking){
            if(this.blockType === 'mid'){
                if(enemyAttackType === 'high'){
                    console.log('blocked');
                    this.knockback();
                }
                else if(enemyAttackType === 'mid'){
                    console.log('blocked');
                    this.knockback();
                }
                else{
                    this.health--;
                }
            }
            else if (this.blockType === 'low'){
                if(enemyAttackType === 'low'){
                    console.log('blocked');
                    this.knockback();
                }
                else if (enemyAttackType === 'mid'){
                    console.log('blocked');
                    this.knockback();
                }
                else{
                    this.health--;
                }
            }
        }
        else{
            this.health--;
        }
    }

    switchSprite(sprite){
        if(    (this.image === this.sprites.attackc.image
            && this.frameCurrent < this.sprites.attackc.framesMax - 1)
            || (this.image === this.sprites.attacka.image
            && this.frameCurrent < this.sprites.attacka.framesMax - 1)
            || (this.image === this.sprites.attacks.image
            && this.frameCurrent < this.sprites.attacks.framesMax - 1)
            || (this.image === this.sprites.win.image
            && this.frameCurrent < this.sprites.win.framesMax - 1)
            || (this.image === this.sprites.loss.image
            && this.frameCurrent < this.sprites.loss.framesMax - 1)){
            return;
        }

        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'walkf':
                if(this.image !== this.sprites.walkf.image){
                    this.image = this.sprites.walkf.image;
                    this.framesMax = this.sprites.walkf.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'walkb':
                if(this.image !== this.sprites.walkb.image){
                    this.image = this.sprites.walkb.image;
                    this.framesMax = this.sprites.walkb.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'jump2':
                if(this.image !== this.sprites.jump2.image){
                    this.image = this.sprites.jump2.image;
                    this.framesMax = this.sprites.jump2.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'attacks':
                if(this.image !== this.sprites.attacks.image){
                    this.image = this.sprites.attacks.image;
                    this.framesMax = this.sprites.attacks.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'attacka':
                if(this.image !== this.sprites.attacka.image){
                    this.image = this.sprites.attacka.image;
                    this.framesMax = this.sprites.attacka.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'attackc':
                if(this.image !== this.sprites.attackc.image){
                    this.image = this.sprites.attackc.image;
                    this.framesMax = this.sprites.attackc.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'crouch':
                if(this.image !== this.sprites.crouch.image){
                    this.image = this.sprites.crouch.image;
                    this.framesMax = this.sprites.crouch.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'blocks':
                if(this.image !== this.sprites.blocks.image){
                    this.image = this.sprites.blocks.image;
                    this.framesMax = this.sprites.blocks.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'blockc':
                if(this.image !== this.sprites.blockc.image){
                    this.image = this.sprites.blockc.image;
                    this.framesMax = this.sprites.blockc.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'win':
                if(this.image !== this.sprites.win.image){
                    this.image = this.sprites.win.image;
                    this.framesMax = this.sprites.win.framesMax;
                    this.frameCurrent = 0;
                }
                break;
            case 'loss':
                if(this.image !== this.sprites.loss.image){
                    this.image = this.sprites.loss.image;
                    this.framesMax = this.sprites.loss.framesMax;
                    this.frameCurrent = 0;
                }
                break;
        }
    }
}