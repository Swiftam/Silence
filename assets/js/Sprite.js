function Sprite(assetPath, options)
{
	this.eventCallbacks = [];
	this.loaded = false;
	if ( assetPath && options ) {
		this.image = this.loadImage(assetPath, options.imageLoading, options.imageLoaded);
	} else {
		this.image = null;
	}
	this.x = options && options.x | 0;
	this.y = options && options.y | 0;
	this.width = options && options.width | 0;
	this.height = options && options.height | 0;
	this.box = {
		left: options && options.x | 0,
		right: (options && options.x | 0) + (options && options.width | 0),
		top: options && options.y | 0,
		bottom: (options && options.y | 0) + (options && options.height | 0)
	};
}

Sprite.prototype.loadImage = function(assetPath, loadingCallback, loadedCallback) {
	if ( loadingCallback ) loadingCallback();
	var img = new Image();
	var sender = this;
	img.onload = function() {
		if ( loadedCallback ) loadedCallback();
		this.loaded = true;
	};
	img.src = assetPath;
	return img;
};

Sprite.prototype.render = function(context, mouseOver, mouseDown) {
	context.drawImage(this.image, this.box.left, this.box.top, this.width, this.height );
}

Sprite.prototype.containsPoint = function(point) {
	return (point[0] > this.box.left && point[0] < this.box.right
		&& point[1] > this.box.top && point[1] < this.box.bottom);
}

/**
 * Add a callback to an event keyword
 */
Sprite.prototype.addEvent = function(event, callback) {
	if ( !this.eventCallbacks[event] ) this.eventCallbacks[event] = [];
	var nLen = this.eventCallbacks[event].length;
	this.eventCallbacks[event][nLen] = callback;
}

/**
 * Trigger all callbacks associated with an event
 */
Sprite.prototype.trigger = function(event, eventData) {
	var eventCallbacks = this.eventCallbacks[event];
	if ( !eventCallbacks ) {
		return;
	}
	var nLen = eventCallbacks.length;
	
	for ( var x = 0; x < nLen; x++ ) {
		var callback = eventCallbacks[x];
		callback(eventData);
	}
}
