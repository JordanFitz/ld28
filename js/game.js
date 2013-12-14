var game = {},
	resources = {},
	player = {};

resources.images = {};
game.requestId = 0;
game.canvas = $("canvas#canvas")[0];
game.ctx = game.canvas.getContext("2d");
game.keys = [],
player.position = {};

$(document).ready(function(){

	game.update = function(){
		if(game.keys[keys.up]){
			player.position.y -= 4;
		}
		if(game.keys[keys.left]){
			player.position.x -= 4;
			player.facing = "left";
		} 
		if(game.keys[keys.down]){
			player.position.y += 4;
		} 
		if(game.keys[keys.right]){
			player.position.x += 4;
			player.facing = "right";
		}
		if(game.keys[keys.x]){
			player.state = "attack";
		}

		if(player.state == "attack"){
			if(player.facing == "right"){
				resources.images["player"] = resources.images['player_attack_right'];
			} else {
				resources.images["player"] = resources.images['player_attack_left'];
			}
		} else if(player.state == "idle"){
			if(player.facing == "right")
				resources.images["player"] = resources.images['player_idle_right'];
			else
				resources.images["player"] = resources.images['player_idle_left'];
		}
	}

	game.draw = function(){
		game.update();

		//clear screen
		game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
		//paint screen white
		game.ctx.fillStyle = "#fff";
		game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

		if(game.currentRoom["default_tiles"]){
			//ground
			for (var i = 0; i < 10; i++) {
				for (var j = 2; j < 9; j++) {
					var tileX = i*64,
						tileY = j*64;
						game.ctx.drawImage(resources.images["ground"], tileX, tileY);
				}
			}

			//walls
			//right
			for (var i = 2; i < 9; i++) {
				game.ctx.drawImage(resources.images["wall"], 0, i*64);
			}
			//left
			for (var i = 2; i < 9; i++) {
				game.ctx.drawImage(resources.images["wall"], 576, i*64);	
			}

			//doors
			game.ctx.drawImage(resources.images["door_right"], 0, 320);
			game.ctx.drawImage(resources.images["door_left"], 576, 320);


			//player
			if(player.facing == "left" && player.state == "attack")
				game.ctx.drawImage(resources.images["player"], player.position.x - 35, player.position.y);
			else
				game.ctx.drawImage(resources.images["player"], player.position.x, player.position.y);
		}

		if(game.currentRoom["normal_hud"]){
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
		}

		//requestAnimationFrame
		game.requestId = window.requestAnimationFrame(game.draw);
	}

	game.init = function(){
		loadAllImages();
		game.requestId = window.requestAnimationFrame(game.draw);
		game.canvas.width = 640;
		game.canvas.height = 576;
		game.ctx.font = '17px "Minecraftia"';
		game.score = 0;
		game.deaths = 0;
		game.currentRoom = views["room1"];

		player.position.x = tilePosition(2);
		player.position.y = tilePosition(5);
		player.state = "idle";
		player.facing = "right";

		window.addEventListener("keydown", function(e){
			if(e.keyCode == keys.up){
				game.keys[e.keyCode] = true;
			} else if(e.keyCode == keys.left){
				game.keys[e.keyCode] = true;
			} else if(e.keyCode == keys.down){
				game.keys[e.keyCode] = true;
			} else if(e.keyCode == keys.right){
				game.keys[e.keyCode] = true;
			} else if(e.keyCode == keys.x){ 
				game.keys[e.keyCode] = true;
			}
		});

		window.addEventListener("keyup", function(e){
			if(e.keyCode == keys.x){
				player.state = "idle";
			}
			game.keys[e.keyCode] = false;		
		});
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
	resources.images['current_heart'] = resources.images["heart_1"];

	resources.images["ground"] = loadImage("img/ground.png");

	resources.images["wall"] = loadImage("img/wall.png");

	resources.images['door_right'] = loadImage("img/door_right.png");
	resources.images['door_left'] = loadImage("img/door_left.png");

	//player
	resources.images['player_idle_right'] = loadImage("img/player_idle_right.png");
	resources.images['player_idle_left'] = loadImage("img/player_idle_left.png");
	resources.images['player_attack_right'] = loadImage("img/player_attack_right.png");
	resources.images['player_attack_left'] = loadImage("img/player_attack_left.png");
	resources.images['player'] = resources.images['player_idle_right'];
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