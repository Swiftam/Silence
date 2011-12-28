function Scene() {
	this.backgroundImage = null;
	this.assets = [];
	this.pendingAssets = 0;
	this.eventCallbacks = [];
}
Scene.prototype.parseAsset = function(assetId) {
	if ( assetId ) {
		this.assets[assetId].loaded = true;
	}
	--this.pendingAssets;
}
Scene.prototype.setBackground = function(assetPath) {
	var sceneCaller = this;
	this.backgroundImage = new Sprite().loadImage(assetPath, function() {
		sceneCaller.pendingAssets++;
	}, function() {
		sceneCaller.parseAsset();
	});
}

Scene.prototype.addCharacter = function(assetPath, xPos, yPos, width, height) {
	var sceneCaller = this;
	var assetId = this.assets.length;
	var sprite = new Character(assetPath, {
		x: xPos,
		y: yPos,
		width: width,
		height: height,
		box: {
			left: xPos,
			right: xPos + width,
			top: yPos,
			bottom: yPos + height
		},
		imageLoading: function() {
			sceneCaller.pendingAssets++;
		},
		imageLoaded: function() {
			sceneCaller.parseAsset(assetId);
		},
		loaded: false
	});
	this.assets[assetId] = sprite;
	return sprite;
}

Scene.prototype.addSprite = function(assetPath, xPos, yPos, width, height) {
	var sceneCaller = this;
	var assetId = this.assets.length;
	var sprite = new Sprite(assetPath, {
		x: xPos,
		y: yPos,
		width: width,
		height: height,
		box: {
			left: xPos,
			right: xPos + width,
			top: yPos,
			bottom: yPos + height
		},
		imageLoading: function() {
			sceneCaller.pendingAssets++;
		},
		imageLoaded: function() {
			sceneCaller.parseAsset(assetId);
		},
		loaded: false
	});
	this.assets[assetId] = sprite;
	return sprite;
}

Scene.prototype.addButton = function(assetPath, xPos, yPos, width, height) {
	var sceneCaller = this;
	var assetId = this.assets.length;
	var button = new Button(assetPath, {
		x: xPos,
		y: yPos,
		width: width,
		height: height,
		box: {
			left: xPos,
			right: xPos + width,
			top: yPos,
			bottom: yPos + height
		},
		imageLoading: function() {
			sceneCaller.pendingAssets++;
		},
		imageLoaded: function() {
			sceneCaller.parseAsset(assetId);
		},
		loaded: false
	});
	this.assets[assetId] = button;
	return button;
}

Scene.prototype.render = function(context, mousePos, mouseOver, mouseDown) {
	if ( this.pendingAssets > 0 ) {
		// TODO: Loading Screen
	} else {
		this.renderBackground(context);
		this.renderSprites(context, mousePos, mouseOver, mouseDown);
	}
}

/**
 * Handle a click inside the scene
 */
Scene.prototype.click = function(position) {
	for (var x = 0; x<this.assets.length; x++) {
		var asset = this.assets[x];
		if ( asset.containsPoint(position) ) {
			asset.trigger('click', {pos: position});
			return true;
		}
	}
	return false;
}

Scene.prototype.renderBackground = function(context) {
	if ( this.backgroundImage ) {
		context.drawImage( this.backgroundImage, 0, 0 );
	}
}
Scene.prototype.renderSprites = function(context, mousePos, mouseOver, mouseDown) {
	for (var x = 0; x<this.assets.length; x++) {
		var asset = this.assets[x];
		if ( mouseOver && asset.containsPoint(mousePos) ) {
			asset.render( context, mouseOver, mouseDown );
		} else {
			asset.render( context, false, false );
		}
		//context.drawImage( asset.image, asset.x, asset.y, asset.width, asset.height );
	}
}

/**
 * Add a callback to an event keyword
 */
Scene.prototype.addEvent = function(event, callback) {
	if ( !this.eventCallbacks[event] ) this.eventCallbacks[event] = [];
	var nLen = this.eventCallbacks[event].length;
	this.eventCallbacks[event][nLen] = callback;
}

/**
 * Trigger all callbacks associated with an event
 */
Scene.prototype.trigger = function(event, eventData) {
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
