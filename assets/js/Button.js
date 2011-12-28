Button.prototype = new Sprite();
Button.constructor = Button;

function Button(assetPath, options) {
	this.image = this.loadImage(assetPath, options.imageLoading, options.imageLoaded);
	this.x = options.x | 0;
	this.y = options.y | 0;
	this.width = options.width | 0;
	this.height = options.height | 0;
	this.box = {
		left: options.x | 0,
		right: (options.x | 0) + (options.width | 0),
		top: options.y | 0,
		bottom: (options.y | 0) + (options.height | 0)
	};
}

Button.prototype.render = function(context, mouseOver, mouseDown) {
	if ( mouseDown ) {
		context.drawImage(this.image, 0, this.height, this.width, this.height,
					this.box.left, this.box.top, this.width, this.height );
	} else if ( mouseOver ) {
		context.drawImage(this.image, 0, this.height * 2, this.width, this.height,
					this.box.left, this.box.top, this.width, this.height );
	} else {
		context.drawImage(this.image, 0, 0, this.width, this.height,
					this.box.left, this.box.top, this.width, this.height );
	}
};
