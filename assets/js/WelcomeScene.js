WelcomeScene.prototype = new Scene();
WelcomeScene.constructor = WelcomeScene;

function WelcomeScene(options) {
	if ( options.backgroundPath ) {
		this.setBackground( options.backgroundPath );
	}
}
