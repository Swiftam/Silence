RoomScene.prototype = new Scene();
RoomScene.constructor = RoomScene;

function RoomScene(options) {
	this.walkContext = null;

	if ( options.backgroundPath ) {
		this.setBackground( options.backgroundPath );
	}

	if ( options.backgroundWalkablePath ) {
		// TODO: This code assumes browser supports canvas object, because we
		//	 would not have advanced past the Game() object if this were
		//	 not true
		var canvas = document.createElement('canvas');
		canvas.width = 800;
		canvas.height = 600;
		this.walkContext = canvas.getContext('2d');
		this.setWalkableArea( options.backgroundWalkablePath );
	}
}

RoomScene.prototype.setWalkableArea = function( walkableAssetPath )
{
	var sceneCaller = this;
	var image = new Sprite().loadImage(walkableAssetPath, function() {
		sceneCaller.pendingAssets++;
	}, function() {
		sceneCaller.parseAsset();
		sceneCaller.walkContext.drawImage(image,0,0);
	});
};

/**
 * Over-ride the click function to allow for walkable paths
 */
RoomScene.prototype.click = function( position ) {
	if (!Scene.prototype.click.call( this, position ) ) {
		if ( !this.walkContext ) return;

		var iData = this.walkContext.getImageData(position[0], position[1], 1, 1);
		if ( 0 == iData.data[0] == iData.data[1] == iData.data[2] ) {
			this.trigger('walk', { pos: position });
		}
	}
};
