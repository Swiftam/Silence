var Game = function(settings)
{
	var scenes = [];
	var gameInstance = this;
	var mouseDown = false;
	var mouseOver = false;
	var mousePos = [0,0];
	var scene = null;
	var frameRate = 1000 / 32;
	var pc = null;
	var lastLoop = new Date;
	var fpsMonitor = document.getElementById('fpsMonitor');
	this.run = function() {
		var canvas = document.getElementById(settings.canvasId);
		if ( canvas.getContext ) {
			var ctx = canvas.getContext('2d');
			scene = scenes['welcome'] = createWelcomeScene();
			attachListeners(canvas);
			renderLoop(ctx);
		} else {
			alert('TODO: Gracefully handle canvas-unsupported browser');
		}
	};

	/**
	 * Attach mouse listeners and other to the canvas
	 */
	var attachListeners = function(canvas) {
		// Needed to get relative positioning on move events
		canvas.style.position = 'relative';

		window.addEventListener('mouseup', function() {
			mouseDown = false;
			if ( mouseOver && scene ) {
				scene.click( mousePos );
			}
		});

		canvas.addEventListener('mousedown', function() {
			mouseDown = true;
		});

		canvas.addEventListener('mouseout', function() {
			mouseOver = false;
		});

 		canvas.addEventListener('mousemove', function(evt) {
			if ( window.event ) evt = window.event;
			mouseOver = true;
			mousePos = [evt.clientX - canvas.offsetLeft + window.pageXOffset, evt.clientY - canvas.offsetTop + window.pageYOffset];
		});
	};

	var createWelcomeScene = function() {
		scene = new WelcomeScene({
			backgroundPath: settings.cdnUrl + 'welcome/background.png'
		});

		var button = scene.addButton( settings.cdnUrl + 'welcome/start.png', // Asset Path
					5,				// xPos
					25,				// yPos
					250,				// width,
					25,				// height
					false,				// hoverState
					false );			// downState
		button.addEvent('click', function() {
			scene = scenes['avatar_editor'] = createAvatarEditor();
		});
		return scene;
	};

	var createAvatarEditor = function() {
		scene = new AvatarEditor({
			backgroundPath: settings.cdnUrl + 'avatar_editor/background.png'
		});

		var button = scene.addButton( settings.cdnUrl + 'avatar_editor/button_done.png', // Asset Path
					490,				// xPos
					360,				// yPos
					200,				// width,
					50,				// height
					true,				// hoverState
					true );				// downState
		button.addEvent('click', function() {
			scene = scenes['room001'] = createRoom001();
		});
		return scene;
	};

	var createRoom001 = function() {
		var exits = [];
		exits['room002'] = { callback: createRoom002, pos: [200,350] };

		scene = new RoomScene({
			backgroundPath: settings.cdnUrl + 'rooms/001/background.png',
			backgroundWalkablePath: settings.cdnUrl + 'rooms/001/background_walkable.png'
		});

		door = scene.addSprite( settings.cdnUrl + 'rooms/001/door.png', 141, 225, 50, 100 );
		door.addEvent('click', function(evt) {
			pc.walk(exits['room002'].pos);
		});

		pc = scene.addCharacter( settings.cdnUrl + 'avatars/default.png', 400, 300, 100, 100 );
		scene.addEvent('walk', function(evt) {
			pc.walk(evt.pos);
		});
		pc.addEvent('walkArrived', function(evt) {
			for ( var exitName in exits ) {
				var exitData = exits[exitName];
				var exitPos = exitData.pos;
				if ( evt.pos[0] == Math.floor(exitPos[0]-(pc.width/2)) && evt.pos[1] == Math.floor(exitPos[1]-pc.height) ) {
					exitData.callback({pos: exitPos, actor: pc});
				}
			}
		});

		return scene;
	};

	var createRoom002 = function() {
		console.log('creating room2');
	};

	var renderLoop = function(context) {
		if ( scene ) {
			scene.render(context, mousePos, mouseOver, mouseDown);
		}
		requestAnimationFrame(function() {
			renderLoop(context);
		});
		if ( null != fpsMonitor ) {
			var thisLoop = new Date;
			fpsMonitor.innerText = ''+(1000 / (thisLoop-lastLoop));
			lastLoop = thisLoop;
		}
	};
};
