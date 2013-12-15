var game = {},
	resources = {},
	player = {},
	enemy = {};

resources.images = {};
resources.audio = {};
game.requestId = 0;
game.canvas = $("canvas#canvas")[0];
game.ctx = game.canvas.getContext("2d");
game.keys = [],
player.position = {};
enemy.position = {};

$(document).ready(function(){

	game.update = function(){
		if(game.currentRoom["space_skip"]){
			if(game.keys[keys.space]){
				if(game.currentRoom["next_room"] == null){
					game.currentRoom["special_text"] = true;
					game.currentRoom["text"] = ["How the heck did you beat that last enemy? (the end)"];
				} else {
					game.currentRoom = views[game.currentRoom["next_room"]];
					player.state = "idle";
					player.facing = "right";
					if(game.currentRoom["default_start_position"]){
						player.position.x = tilePosition(2);
						player.position.y = tilePosition(5);
					} else {
						player.position.x = tilePosition(game.currentRoom["start_position"][0]);
						player.position.y = tilePosition(game.currentRoom["start_position"][1]);
					}
						enemy.steps = 0;
					if(game.currentRoom["enemy"]["default_start_position"]){
						enemy.position.x = tilePosition(6);
						enemy.position.y = tilePosition(4) + 32;
					} else {
						enemy.position.x = tilePosition(game.currentRoom["enemy"]["start_position"][0]);
						enemy.position.y = tilePosition(game.currentRoom["enemy"]["start_position"][1]);
					}
					game.currentRoom["enemy"]["health"] = game.currentRoom["enemy"]["max_health"];
					resources.images["enemy"] = loadImage(game.currentRoom["enemy"]["img"]);
					fade(0, 0, 0, 1);
				}
			}
		}


		if(boundingBox(64, 320, 32, 64, player.position.x, player.position.y, resources.images["player_idle_right"].width, resources.images["player_idle_right"].height)){
			//left door
			flashText("Press C to go back", 0, 0, 0, 1);
			if(game.keys[keys.c]){
				if(game.currentRoom["previous_room"] == null){
					flashText("This is the first room", 0, 0, 0, 1);	
					//game.currentRoom["special_text"] = true;
					//game.currentRoom["text"] = "How the heck did you beat that last enemy? (the end)";
				} else {
					game.currentRoom = views[game.currentRoom["previous_room"]];
					fade(0, 0, 0, 1);				
					player.state = "idle";
					player.facing = "right";
					if(game.currentRoom["default_start_position"]){
						player.position.x = tilePosition(2);
						player.position.y = tilePosition(5);
					} else {
						player.position.x = tilePosition(game.currentRoom["start_position"][0]);
						player.position.y = tilePosition(game.currentRoom["start_position"][1]);
					}
					if(!game.currentRoom["completed"]){
						enemy.steps = 0;
						if(game.currentRoom["enemy"]["default_start_position"]){
							enemy.position.x = tilePosition(6);
							enemy.position.y = tilePosition(4) + 32;
						} else {
							enemy.position.x = tilePosition(game.currentRoom["enemy"]["start_position"][0]);
							enemy.position.y = tilePosition(game.currentRoom["enemy"]["start_position"][1]);
						}
						resources.images["enemy"] = loadImage(game.currentRoom["enemy"]["img"]);
						game.currentRoom["enemy"]["health"] = game.currentRoom["enemy"]["max_health"];
					}					
				}
			}
		}

		if(boundingBox(512, 320, 32, 64, player.position.x, player.position.y, resources.images["player_idle_right"].width, resources.images["player_idle_right"].height)){
			//right door
			if(game.currentRoom["completed"]){
				flashText("Press C to go ahead", 0, 0, 0, 1);
			}
			if(game.keys[keys.c]){
				if(!game.currentRoom["completed"]){
					flashText("You must complete this room first", 0, 0, 0, 1);	
				} else {
					//go to next room
					if(game.currentRoom["next_room"] == null){
						game.currentRoom["special_text"] = true;
						game.currentRoom["text"] = ["How the heck did you beat that last enemy? (the end)"];
					} else {
						game.currentRoom = views[game.currentRoom["next_room"]];
						fade(0, 0, 0, 1);				
						player.state = "idle";
						player.facing = "right";
						if(game.currentRoom["default_start_position"]){
							player.position.x = tilePosition(2);
							player.position.y = tilePosition(5);
						} else {
							player.position.x = tilePosition(game.currentRoom["start_position"][0]);
							player.position.y = tilePosition(game.currentRoom["start_position"][1]);
						}
						if(!game.currentRoom["completed"]){
							enemy.steps = 0;
							if(game.currentRoom["enemy"]["default_start_position"]){
								enemy.position.x = tilePosition(6);
								enemy.position.y = tilePosition(4) + 32;
							} else {
								enemy.position.x = tilePosition(game.currentRoom["enemy"]["start_position"][0]);
								enemy.position.y = tilePosition(game.currentRoom["enemy"]["start_position"][1]);
							}
							game.currentRoom["enemy"]["health"] = game.currentRoom["enemy"]["max_health"];
							resources.images["enemy"] = loadImage(game.currentRoom["enemy"]["img"]);
						}
					}
				}
			}
		}

		if(game.currentRoom["enemy"] != null && boundingBox( player.position.x, player.position.y, resources.images["player"].width, resources.images["player"].height,
						enemy.position.x, enemy.position.y, resources.images["enemy"].width, resources.images["enemy"].height) &&
						game.currentRoom["enemy"]["health"] > 0 && player.alive){
			if(player.position.x >= enemy.position.x){
				//on left
				if(player.facing == "left"){
					if(player.state == "attack"){
						enemy.damage();
					} else {
						player.damage();
					}
				} else {
					player.damage();
				}
			} else if(player.position.x <= enemy.position.x){
				//on right
				if(player.facing == "right"){
					if(player.state == "attack"){
						enemy.damage();
					} else {
						player.damage();
					}
				} else {
					player.damage();
				}
			}
		}

		if(!player.alive){
			flashText("You died. Press V to respawn");
			if(game.keys[keys.v]){
				player.respawn();
			}
		}

		if(game.fading){
			game.fadeOpacity -= 0.03;
			game.fadeColor = game.fadeColor.substring(0, game.fadeColor.lastIndexOf(", ")) + ", " + game.fadeOpacity + ")";
			if(game.fadeOpacity <= 0) game.fading = false;
		}

		if(game.flashing){
			game.flashingOpacity -= 0.009;
			game.flashingColor = game.flashingColor.substring(0, game.flashingColor.lastIndexOf(", ")) + ", " + game.flashingOpacity + ")";
			if(game.flashingOpacity <= 0) game.flashing = false;
		}

		if(game.keys[keys.up] && player.alive){
			player.position.y -= 4;
		}
		if(game.keys[keys.left] && player.alive){
			player.position.x -= 4;
			player.facing = "left";
		} 
		if(game.keys[keys.down] && player.alive){
			player.position.y += 4;
		} 
		if(game.keys[keys.right] && player.alive){
			player.position.x += 4;
			player.facing = "right";
		}
		if(game.keys[keys.x] && player.alive){
			if(player.state == "idle"){
				if(resources.audio["swordswing"].duration > 0 && !resources.audio["swordswing"].paused){
					resources.audio["swordswing"].pause();
					resources.audio["swordswing"].currentTime = 0;
					resources.audio["swordswing"].play();
				} else {
					resources.audio["swordswing"].play();
				}
				player.state = "attack";
			} else {
				player.state = "attack";
			}
		}

		if(player.position.x <= 64){
			player.position.x = 64;
		} else if(player.position.x + resources.images["player_idle_right"].width >= 576){
			player.position.x = 576 - resources.images["player_idle_right"].width;
		}

		if(player.position.y <= 128){
			player.position.y = 128;
		} else if(player.position.y + resources.images["player_idle_right"].height >= 576){
			player.position.y = 576 - resources.images["player_idle_right"].height;
		}

		if(game.currentRoom["enemy"] != null && enemy.position.x <= 64){
			enemy.position.x = 64;
		} else if(game.currentRoom["enemy"] != null && enemy.position.x + resources.images["enemy"].width >= 576){
			enemy.position.x = 576 - resources.images["enemy"].width;
		}

		if(game.currentRoom["enemy"] != null && enemy.position.y <= 128){
			enemy.position.y = 128;
		} else if(game.currentRoom["enemy"] != null && enemy.position.y + resources.images["enemy"].height >= 576){
			enemy.position.y = 576 - resources.images["enemy"].height;
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

		//enemy
		if(enemy.steps < 100){
			var units = {};
			units.x = (player.position.x - enemy.position.x) / 100;
			units.y = (player.position.y - enemy.position.y) / 100;
			if(game.currentRoom["enemy"] != null && game.currentRoom["enemy"].health > 0){
				enemy.position.x += units.x;
				enemy.position.y += units.y;
			}
			enemy.steps++;
		} else {
			enemy.steps = 0;
		}

		if(game.currentRoom["enemy"] != null && game.currentRoom["enemy"]["health"] <= 0){
			game.currentRoom["completed"] = true;
		}
	}

	game.draw = function(){
		game.update();

		//clear screen
		game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
		//paint screen white
		if(game.currentRoom["background"] == null)
			game.ctx.fillStyle = "#fff";
		else
			game.ctx.fillStyle = game.currentRoom["background"];
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

			//enemy
			if(game.currentRoom["enemy"]["health"] > 0){
				game.ctx.textAlign = "center";
				game.ctx.fillStyle = "#000";
				game.ctx.fillText("Health: " + Math.ceil(game.currentRoom["enemy"]["health"]).toString() + " / " + (game.currentRoom["enemy"]["max_health"]).toString(),
							 enemy.position.x + resources.images["enemy"].width / 2,
							 enemy.position.y - 32);
				game.ctx.drawImage(resources.images["enemy"], enemy.position.x, enemy.position.y);
			}

			//player
			if(player.facing == "left" && player.state == "attack"){
				if(player.alive == true) game.ctx.drawImage(resources.images["player"], player.position.x - 35, player.position.y);
			} else {
				if(player.alive == true) game.ctx.drawImage(resources.images["player"], player.position.x, player.position.y);
			}
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
			game.ctx.drawImage(resources.images["heart"], game.canvas.width / 2 - 64, 0);
		}

		//flashing text
		if(game.flashing){
			game.ctx.fillStyle = game.flashingColor;
			game.ctx.textAlign = "center";
			game.ctx.fillText(game.flashingText, game.canvas.width / 2, 352);
		}

		if(game.currentRoom["special_text"]){
			game.ctx.textAlign = "center";
			if(game.currentRoom["background"] == "#000")
				game.ctx.fillStyle = "#fff";
			else
				game.ctx.fillStyle = "#000";
			for (var i = 0; i < game.currentRoom["text"].length; i++) {
				game.ctx.fillText(game.currentRoom["text"][i], game.canvas.width / 2, 160 + i*32);
			}
		}

		//overlay
		if(game.fading){
			game.ctx.fillStyle = game.fadeColor;
			game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
		}

		//requestAnimationFrame
		game.requestId = window.requestAnimationFrame(game.draw);
	}

	game.init = function(){
		loadAllImages();

		resources.audio["swordswing"] = loadAudio("audio/swordswing.wav", false);
		resources.audio["music"] = loadAudio("audio/music.wav", true);
		resources.audio["hurt"] = loadAudio("audio/hurt.wav", false);

		game.requestId = window.requestAnimationFrame(game.draw);
		game.canvas.width = 640;
		game.canvas.height = 576;
		game.ctx.font = '17px "Minecraftia"';
		game.score = 0;
		game.deaths = 0;
		game.currentRoom = views["start"];

		player.alive = true;
		player.health = 4;

		player.damage = function(){
			fade(255, 0, 0, 0.5);
			player.health -= game.currentRoom["enemy"]["damage"];
			chooseHeartImage(Math.ceil(player.health));
			if(player.health <= 0){
				player.alive = false;
				game.deaths++;
			}
			resources.audio["hurt"].play();
		}

		player.respawn = function(){
			fade(0, 0, 0, 1);
			resources.images['heart'] = resources.images["heart_1"];
			player.alive = true;
			player.health = 4;
			player.state = "idle";
			player.facing = "right";
			if(game.currentRoom["default_start_position"]){
				player.position.x = tilePosition(2);
				player.position.y = tilePosition(5);
			} else {
				player.position.x = tilePosition(game.currentRoom["start_position"][0]);
				player.position.y = tilePosition(game.currentRoom["start_position"][1]);
			}
			enemy.steps = 0;
			if(game.currentRoom["enemy"]["default_start_position"]){
				enemy.position.x = tilePosition(6);
				enemy.position.y = tilePosition(4) + 32;
			} else {
				enemy.position.x = tilePosition(game.currentRoom["enemy"]["start_position"][0]);
				enemy.position.y = tilePosition(game.currentRoom["enemy"]["start_position"][1]);
			}
			game.currentRoom["enemy"]["health"] = game.currentRoom["enemy"]["max_health"];
		}

		if(game.currentRoom["default_start_position"]){
			player.position.x = tilePosition(2);
			player.position.y = tilePosition(5);
		} else {
			player.position.x = tilePosition(game.currentRoom["start_position"][0]);
			player.position.y = tilePosition(game.currentRoom["start_position"][1]);
		}

		player.state = "idle";
		player.facing = "right";

		if(game.currentRoom["enemy"] != null){
			resources.images["enemy1"] = loadImage(game.currentRoom["enemy"]["img"]);
			resources.images["enemy"] = resources.images["enemy1"];
		}

		enemy.steps = 0;
		if(game.currentRoom["enemy"] != null && game.currentRoom["enemy"]["default_start_position"]){
			enemy.position.x = tilePosition(6);
			enemy.position.y = tilePosition(4) + 32;
		} else {
			if(game.currentRoom["enemy"] != null){
				enemy.position.x = tilePosition(game.currentRoom["enemy"]["start_position"][0]);
				enemy.position.y = tilePosition(game.currentRoom["enemy"]["start_position"][1]);
			} 
		}

		enemy.damage = function(){
			game.currentRoom["enemy"]["health"] -= 0.3;
			if(player.facing == "left"){
				enemy.position.x -= 64;
			} else {
				enemy.position.x += 64;
			}
			if(game.currentRoom["enemy"]["health"] <= 0){
				game.score += game.currentRoom["reward"];
				if(game.currentRoom["regen_on_complete"]){
					resources.images['heart'] = resources.images["heart_1"];
					player.health = 4;
					flashText("You can now proceed to the next room", 0, 0, 0, 1);
				}
			}
		}

		window.addEventListener("keydown", function(e){
			if(e.keyCode == keys.up){
				game.keys[e.keyCode] = true;
				e.preventDefault();
			} else if(e.keyCode == keys.left){
				game.keys[e.keyCode] = true;
				e.preventDefault();
			} else if(e.keyCode == keys.down){
				game.keys[e.keyCode] = true;
				e.preventDefault();
			} else if(e.keyCode == keys.right){
				game.keys[e.keyCode] = true;
				e.preventDefault();
			} else if(e.keyCode == keys.c){
				game.keys[e.keyCode] = true;
				e.preventDefault();
			} else if(e.keyCode == keys.v){
				game.keys[e.keyCode] = true;
				e.preventDefault();
			} else if(e.keyCode == keys.space){
				game.keys[e.keyCode] = true;
				e.preventDefault();
			}
		});

		window.addEventListener("keyup", function(e){
			if(e.keyCode == keys.x){

				game.keys[e.keyCode] = true;
				player.state = "attack";

				setTimeout(function(){
					player.state = "idle";
					game.keys[e.keyCode] = false;
				}, 250);
			}
			game.keys[e.keyCode] = false;		
		});

		resources.audio["music"].play();

		$("div#mute").click(function(){
			if(resources.audio["music"].paused){
				resources.audio["music"].play();
				$(this).html("Pause music");
			} else {
				resources.audio["music"].pause();
				$(this).html("Play music");
			}
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
	resources.images['heart'] = resources.images["heart_1"];

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

var fade = function(r, g, b, opacity){
	game.fading = true;
	game.fadeColor = "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
	game.fadeOpacity = opacity;
}

var flashText = function(text, r, g, b, opacity){
	game.flashing = true;
	game.flashingText = text;
	game.flashingColor = "rgba(" + r + ", " + g + ", " + b  + ", " + opacity + ")";
	game.flashingOpacity = opacity;
}

var chooseHeartImage = function(health){
	switch(health){	
		case 4:
			resources.images["heart"] = resources.images["heart_1"];
		break;
		case 3:
			resources.images["heart"] = resources.images["heart_2"];
		break;
		case 2:
			resources.images["heart"] = resources.images["heart_3"];
		break;
		case 1:
			resources.images["heart"] = resources.images["heart_4"];
		break;
		case 0:
			resources.images["heart"] = resources.images["heart_5"];
		break;
	}
}