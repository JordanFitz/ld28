Array.prototype.contains = function(search) {
	return (this.indexOf(search) !== -1);
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var loadImage = function(src){
	var img = new Image();
	img.src = src;
	return img;
}

var loadAudio = function(src){
	var aud = new Audio();
	aud.src = src;
	return aud;
}

var tilePosition = function(ind){
	return ind*64;
}

var boundingBox = function(x1, y1, w1, h1, x2, y2, w2, h2){
	if( x1 > x2 + w2 - 1 ||
		y1 > y2 + h2 - 1 || 
		x2 > x1 + w1 - 1 || 
		y2 > y1 + h1 - 1){

		return false;
	}
	return true;
}