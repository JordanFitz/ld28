var views = {
	"start": {
		"normal_hud": false,
		"default_tiles": false,
		"enemy": null,
		"completed": true,
		"default_start_position": true,
		"next_room": "room1",
		"previous_room": null,
		"reward": 0,
		"special_text": true,
		"text": ["You Only Live 1e+32nce",
			     "",
				 "Press X to attack",
				 "Press C to go through doors",
				 "And press V to respawn.",
				 "",
				 "You only get one heart D:",
				 "",
				 "Press space to start"],
		"background": "#000",
		"space_skip": true
	},

	"room1": {
		"normal_hud": true,
		"default_tiles": true,
		"enemy": {
			"health": 5,
			"max_health": 5,
			"img": "img/enemy2.png",
			"default_start_position": true,
			"damage": 0.03
		},
		"completed": false,
		"default_start_position": true,
		"previous_room": null,
		"next_room": "room2",
		"regen_on_complete": true,
		"reward": 3
	},
	"room2": {
		"normal_hud": true,
		"default_tiles": true,
		"enemy": {
			"health": 10,
			"max_health": 10,
			"img": "img/enemy1.png",
			"default_start_position": true,
			"damage": 0.05
		},
		"completed": false,
		"default_start_position": true,
		"previous_room": "room1",
		"next_room": "room3",
		"regen_on_complete": true,
		"reward": 6
	},
	"room3": {
		"normal_hud": true,
		"default_tiles": true,
		"enemy": {
			"health": 15,
			"max_health": 15,
			"img": "img/enemy3.png",
			"default_start_position": true,
			"damage": 0.1
		},
		"completed": false,
		"default_start_position": true,
		"previous_room": "room2",
		"next_room": "room4",
		"regen_on_complete": true,
		"reward": 9
	},
	"room4": {
		"normal_hud": true,
		"default_tiles": true,
		"enemy": {
			"health": 50,
			"max_health": 50,
			"img": "img/enemy4.png",
			"default_start_position": true,
			"damage": 1
		},
		"completed": false,
		"default_start_position": true,
		"previous_room": "room2",
		"next_room": null,
		"regen_on_complete": true,
		"reward": 50
	}
};