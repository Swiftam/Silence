Character.prototype = new Sprite();
Character.constructor = Character;

function Character(assetPath, options) {
	this.image = this.loadImage(assetPath, options.imageLoading, options.imageLoaded);
	this.width = options.width | 0;
	this.height = options.height | 0;
	this.box = {
		left: options.x | 0,
		right: (options.x | 0) + (options.width | 0),
		top: options.y | 0,
		bottom: (options.y | 0) + (options.height | 0)
	};

	// TODO: Different avatars have different speeds
	this.speed = 5;
	this.pos = [options.x | 0, options.y | 0];
	this.walking = this.pos;
}

Character.prototype.walk = function(position) {
	this.walking = [position[0] - this.width /2, position[1] - this.height];
}

Character.prototype.render = function(context, mouseOver, mouseDown) {
	if ( this.pos[0] != this.walking[0] || this.pos[1] != this.walking[1] ) {
		if ( this.pos[0] > this.walking[0] ) {
			this.pos[0] = Math.max(this.pos[0] - this.speed, this.walking[0] );
		} else if ( this.pos[0] < this.walking[0] ) {
			this.pos[0] = Math.min(this.pos[0] + this.speed, this.walking[0] );
		}
		if ( this.pos[1] > this.walking[1] ) {
			this.pos[1] = Math.max(this.pos[1] - this.speed, this.walking[1] );
		} else if ( this.pos[1] < this.walking[1] ) {
			this.pos[1] = Math.min(this.pos[1] + this.speed, this.walking[1] );
		}

		// Determine if we have now arrived at destination
		if ( this.pos[0] == this.walking[0] && this.pos[1] == this.walking[1] ) {
			this.trigger('walkArrived', { pos: this.pos });
		}
	}
	context.drawImage(this.image, this.pos[0], this.pos[1], this.width, this.height);
};
