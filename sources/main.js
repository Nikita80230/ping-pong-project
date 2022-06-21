
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

function moveLeft() {
    ball.x -= 1;
    setTimeout(() => moveLeft(), 10);
}

function moveRight() {
    ball.x += 1;
    setTimeout(() => moveRight(), 10);
}

function ballMove() {
    ball.x += 1;
    setTimeout(() => ballMove(), 10);

    if (ball.x + 10 >= app.screen.width) {
        ball.x -= 1;
        setTimeout(() => moveLeft(), 10);
    }
    if (ball.x <= 0) {
        ball.x += 1;
        setTimeout(() => moveRight(), 10);
    }
}



ballMove();