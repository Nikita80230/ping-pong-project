import * as PIXI from 'pixi.js';
import { animator } from './animator';

window.animator = animator;
 
const app = new PIXI.Application(); 
 
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();
graphics.beginFill(0xFFFFFF);
graphics.drawRect(app.screen.width / 2, 0, 10, 800);
app.stage.addChild(graphics);

const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});

const basicText = new PIXI.Text(`Score: 0`, style);

basicText.x = app.screen.width / 2;
basicText.y = 30;
basicText.anchor.set(0.5, 0);
let score = 0;
 
class Ball { 
  constructor() {
    this.ball = new PIXI.Graphics();
         
    this.ball.beginFill(0xFFFFFF);
    this.ball.drawRect(0, 0, 10, 10);
         
    this.ball.x = app.screen.width / 2;
    this.ball.y = app.screen.height / 2;
   
    app.stage.addChild(this.ball);
  }
  moveToX(endX) { 
    const distance = Math.sqrt((endX - this.ball.x) ** 2); 
    // скорость 100 пикселей в 1 секунду (1000мс) 
    const speed = 10; 
    const time = distance * speed; 

    const startX = this.ball.x; 

    const onUpdate = (progress) => { 
      this.ball.x = (endX - startX) * progress + startX; 
    }; 
      
    animator(time, { onUpdate })
      .then(() => this.startMoveX())
      .catch(() => {}); 
  } 

  startMoveX() { 
    // move left 
    let endX; 
    let leftPosition = this.player.visial.x + this.player.visial.width;
    let rightPosition = app.screen.width - this.ball.width - (app.screen.width - this.bot.visial.x);
    



    // if (this.ball.x === leftPosition) {
    //   endX = rightPosition;
    // } else {
    //   endX = leftPosition;
    // }
    
    if (this.ball.x === app.screen.width / 2) {
      endX = leftPosition;
    } else if (this.ball.x === leftPosition) {
      if (this.ball.y >= this.player.visial.y - 10 && this.ball.y <= this.player.visial.y + 70) {
        endX = rightPosition;
      } else {
        endX = 0;
        score += 1;
        basicText.text = `Score: ${score}`;
      }
    } else if (this.ball.x === rightPosition) {
      endX = leftPosition;
    } else {
      this.ball.x = app.screen.width / 2;
      endX = rightPosition;
    }
    
    
    this.moveToX(endX); 

  }  

  moveToY(endY) { 
    const distance = Math.sqrt((endY - this.ball.y) ** 2); 
 
    const speed = 10; 
    const time = distance * speed; 

    const startY = this.ball.y; 

    const onUpdate = (progress) => { 
      this.ball.y = (endY - startY) * progress + startY; 
    }; 
      
    animator(time, { onUpdate })
      .then(() => this.startMoveY())
      .catch(() => {}); 
  } 

  startMoveY() { 
  
    let endY; 

    if (this.ball.y === 0) {
      endY = app.screen.height - this.ball.height;
    } else {
      endY = 0;
    }
    
    this.moveToY(endY); 
  }  

  addPlayer(player) {
    this.player = player;
  }

  addBot(bot) {
    this.bot = bot;
  }
} 
 
const ball1 = new Ball(); 


class Player {
  constructor() {
    this.visial = new PIXI.Graphics();
         
    this.visial.beginFill(0xFFFFFF);
    this.visial.drawRect(0, 0, 10, 70);
         
    this.visial.x = 30;
    this.visial.y = app.screen.height / 2 - 70 / 2;
   
    app.stage.addChild(this.visial);

    document.addEventListener('mousemove', (event) => {
      if (event.clientY > 0 && event.clientY <= app.screen.height - 71) {
        this.visial.y = event.clientY;
      }
    });
  }
}

let player1 = new Player;




class Bot {
  constructor() {
    this.visial = new PIXI.Graphics();
         
    this.visial.beginFill(0xFFFFFF);
    this.visial.drawRect(0, 0, 10, 70);
         
    this.visial.x = app.screen.width - 30;
    this.visial.y = app.screen.height / 2 - 70 / 2;
   
    app.stage.addChild(this.visial);
  }
}

let bot1 = new Bot; 

function upDate() {
  if (ball1.ball.y > 34 && ball1.ball.y < app.screen.height - 45) {
    bot1.visial.y = ball1.ball.y - 30;
  }
  requestAnimationFrame(() => upDate()); 
};

upDate();

ball1.addPlayer(player1);
ball1.addBot(bot1)
ball1.startMoveY();
ball1.startMoveX();

app.stage.addChild(basicText);