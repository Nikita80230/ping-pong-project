
import * as PIXI from 'pixi.js';


// let width = window.innerWidth;
// let height = window.innerHeight;
// let app;

// let model = {
//     createCanvas: function() {
//         app = new PIXI.Application(width, height);
//         document.body.appendChild(app.view); 
//     }

// }

// model.createCanvas();

// var view = {
// 	loadGame: function(){
// 		model.createCanvas();
// 	}
// }

// view.loadGame();

const app = new PIXI.Application();

document.body.appendChild(app.view);

const ball = new PIXI.Graphics();

ball.beginFill(0xFFFFFF);
ball.drawRect(0, 0, 10, 10);

ball.x = app.screen.width / 2;
ball.y = app.screen.height / 2;

app.stage.addChild(ball);


function ballMove() {
    ball.x += 1;
    setTimeout(() => ballMove(), 10);
    if (ball.x > app.screen.width) {
        ball.x = -ball.x;
        setTimeout(() => ballMove(), 10);  
    }
}



// ballMove();