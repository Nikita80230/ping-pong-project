
import * as PIXI from 'pixi.js';


let width = window.innerWidth;
let height = window.innerHeight;
let app;

let model = {
    createCanvas: function() {
        app = new PIXI.Application(width, height);
        document.body.appendChild(app.view); 
    }

}

model.createCanvas();

var view = {
	loadGame: function(){
		model.createCanvas();
	}
}

view.loadGame();


