
import * as PIXI from 'pixi.js';

const app = new PIXI.Application();

document.body.appendChild(app.view);

class Ball {
    constructor() { 
        this.ball = new PIXI.Graphics(); 
        
        this.ball.beginFill(0xFFFFFF); 
        this.ball.drawRect(0, 0, 10, 10); 
        
        this.ball.x = app.screen.width / 2; 
        this.ball.y = app.screen.height / 2;
            
        this.directionX = 0;
        this.directionY = 0;
        
        app.stage.addChild(this.ball); 
    }

    move() {
        this.ball.x += this.directionX;
        this.ball.y += this.directionY;
        setTimeout(() => this.move(), 10) ;
    }
}

const ball1 = new Ball();
ball1.directionX = 1;
ball1.move();

const time = 0;
function changeDirectionX() {
    if (ball1.directionX == 1) {
        ball1.directionX = -1;
    } else {
        ball1.directionX = 1;
    }
    setTimeout(() => changeDirectionX(), 8000);
}

setTimeout(() => changeDirectionX(), 4000);

 