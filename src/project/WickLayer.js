/* Wick - (c) 2016 Zach Rispoli, Luca Damasco, and Josh Rispoli */

var WickLayer = function () {
	this.frames = [new WickFrame()];
};

WickLayer.prototype.getTotalLength = function () {
	var length = 0;

	for(var i = 0; i < this.frames.length; i++) {
		length += this.frames[i].frameLength;
	}

	return length;
}

WickLayer.prototype.addNewFrame = function() {
    this.frames.push(new WickFrame());
}

WickLayer.prototype.deleteFrame = function(frame) {
    this.frames.splice(this.frames.indexOf(frame), 1);
}