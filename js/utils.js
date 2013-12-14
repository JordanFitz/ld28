Array.prototype.contains = function(search) {
	return (this.indexOf(search) !== -1);
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var loadImage = function(src){
	var img = new Image();
	img.src = src;
	return img;
}

var tilePosition = function(ind){
	return ind*64;
}