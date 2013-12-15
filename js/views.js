var views = {
	"room1": {
		"normal_hud": true,
		"default_tiles": true,
		"enemy": {
			"health": 5,
			"max_health": 5,
			"img": "img/enemy1.png",
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
		"next_room": null,
		"regen_on_complete": true,
		"reward": 6
	}
};