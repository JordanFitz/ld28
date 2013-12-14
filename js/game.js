var game = {},
	resources = {};

resources.images = {};
game.requestId = 0;
game.canvas = $("canvas#canvas")[0];
game.ctx = game.canvas.getContext("2d");

$(document).ready(function(){

	game.update = function(){
		
	}

	game.draw = function(){
		game.update();

		//clear screen
		game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
		//paint screen white
		game.ctx.fillStyle = "#fff";
		game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

		//ground
		for (var i = 0; i < 10; i++) {
			for (var j = 2; j < 8; j++) {
				var tileX = i*64,
					tileY = j*64;
					game.ctx.drawImage(resources.images["ground"], tileX, tileY);
			}
		}

		//walls
		//right
		for (var i = 0; i < 8; i++) {
			game.ctx.drawImage(resources.images["wall"], 0, i*64);
		}
		//left
		for (var i = 0; i < 8; i++) {
			game.ctx.drawImage(resources.images["wall"], 576, i*64);	
		}


		//HUD background
		game.ctx.fillStyle = "#1c1c1c";
		game.ctx.fillRect(0, 0, game.canvas.width, 128)

		//HUD
		game.ctx.fillStyle = "#fff";

		//Score
		game.ctx.textAlign = "left";
		game.ctx.fillText("Score: " + (game.score).toString(), 32, 96);

		//Deaths
		game.ctx.textAlign = "right";
		game.ctx.fillText("Deaths: " + (game.deaths).toString(), canvas.width - 32, 96);

		//heart
		game.ctx.drawImage(resources.images["current_heart"], game.canvas.width / 2 - 64, 0);

		//requestAnimationFrame
		game.requestId = window.requestAnimationFrame(game.draw);
	}

	game.init = function(){
		loadAllImages();
		game.requestId = window.requestAnimationFrame(game.draw);
		game.canvas.width = 640;
		game.canvas.height = 512;
		game.ctx.font = '17px "Minecraftia"';
		game.score = 0;
		game.deaths = 0;
	}

	game.init();
});

 var loadAllImages = function(){

	//all image loading code should go here

	resources.images["heart_1"] = loadImage("img/heart_4-4.png");
	resources.images["heart_2"] = loadImage("img/heart_3-4.png");
	resources.images["heart_3"] = loadImage("img/heart_2-4.png");
	resources.images["heart_4"] = loadImage("img/heart_1-4.png");
	resources.images["heart_5"] = loadImage("img/heart_0-4.png");

	resources.images["ground"] = loadImage("img/ground.png");

	resources.images["wall"] = loadImage("img/wall.png");

	resources.images['current_heart'] = resources.images["heart_1"];
}

var getRotation = function(key){
	switch(key){
		case 0:
			return 0;
		break;
		case 1:
			return 90;
		break;
		case 2:
			return 180;
		break;
		case 3:
			return 270;
		break;
	}
}