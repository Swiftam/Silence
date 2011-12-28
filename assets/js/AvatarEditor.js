AvatarEditor.prototype = new Scene();
AvatarEditor.constructor = AvatarEditor;

function AvatarEditor(options) {
	if ( options && options.backgroundPath ) {
		this.setBackground( options.backgroundPath );
	}
}
