/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */



 /**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */

 function scale( value, a1, a2, b1, b2 ) { 
    return ( value - a1 ) * ( b2 - b1 ) / ( a2 - a1 ) + b1;
}

THREE.FirstPersonControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.disabled = false;

	this.minimumHeight = this.object.position.y;
	this.maximumHeight = this.object.position.y + 100;
	this.targetPositionY = this.object.position.y + 10;

	this.heightDriftSpeed = 0.0004;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.movementSpeed = 6;
	this.lookSpeed = 0.06;

	this.lookVertical = true;
	this.autoForward = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lat = 20;
	this.lon = 0;
	this.phi = 0;
	this.theta = 0;

	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;

	this.mouseDragOn = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;
	this.wheelDelta = 0;
	this.realMouseY = 0;

	this.mouseXSmoothed = 0;
	this.mouseYSmoothed = 0;

	this.smoothHeightDrift = 0;
	this.smoothMoveForward = 0;
	this.smoothMoveBackward = 0;
	this.smoothMoveLeft = 0;
	this.smoothMoveRight = 0;
	this.centerRect = 40;

	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', - 1 );

	}


	renderer.domElement.addEventListener('mousewheel', function(e){
		var maxDelta = 200;
		_this.verticalDelta = THREE.Math.mapLinear(e.wheelDelta, -maxDelta, maxDelta, -0.2, 0.2);
		if (_this.verticalDelta > 0.2) _this.verticalDelta = 0.2;
		if (_this.verticalDelta < -0.2) _this.verticalDelta = -0.2;
		_this.wheelDelta = e.wheelDelta;
	}, true);
	//

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

	this.onMouseDown = function ( event ) {

		if ( this.domElement !== document ) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = true; break;
				case 2: this.moveBackward = true; break;

			}

		}

		this.mouseDragOn = true;

	};

	this.onMouseUp = function ( event ) {

		event.preventDefault();
		event.stopPropagation();

		if ( this.activeLook ) {

			switch ( event.button ) {

				case 0: this.moveForward = false; break;
				case 2: this.moveBackward = false; break;

			}

		}

		this.mouseDragOn = false;

	};

	this.onMouseMove = function ( event ) {

		if ( this.domElement === document ) {

			this.mouseX = event.pageX - this.viewHalfX;
			this.mouseY = event.pageY - this.viewHalfY;
			this.realMouseY = event.pageY;

		} else {

			this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
			this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
			this.realMouseY = event.pageY - this.domElement.offsetTop;

		}

	};

	this.onKeyDown = function ( event ) {

		/// ADD KEYCODES FOR EXTERNAL KEYBOARD UNIT
		console.log(event.keyCode);
		switch ( event.keyCode ) {

			case 38: /*up*/ this.moveForward = true; break;
			case 12: /*up*/ this.moveForward = true; break;
			case 87: /*W*/ this.moveForward = true; break;
			case 104: /*W*/ this.moveForward = true; break;

			case 37: /*left*/ this.moveLeft = true; break;
			case 65: /*A*/ this.moveLeft = true; break;
			case 100: /*A*/ this.moveLeft = true; break;

			case 39: /*right*/ this.moveRight = true; break;
			case 68: /*D*/ this.moveRight = true; break;
			case 54: /*D*/ this.moveRight = true; break;

			case 40: /*down*/ this.moveBackward = true; break;
			case 98: /*down*/ this.moveBackward = true; break;
			case 101: /*S*/ this.moveBackward = true; break;
			case 83: /*S*/ this.moveBackward = true; break;

			case 82: /*R*/ this.moveUp = true; break;
			case 70: /*F*/ this.moveDown = true; break;

		}

	};

	// this.onKeyUp = function ( event ) {

	// 	switch ( event.keyCode ) {

	// 		case 38: /*up*/
	// 		case 87: /*W*/ this.moveForward = false; break;

	// 		case 37: /*left*/
	// 		case 65: /*A*/ this.moveLeft = false; break;

	// 		case 40: /*down*/
	// 		case 83: /*S*/ this.moveBackward = false; break;

	// 		case 39: /*right*/
	// 		case 68: /*D*/ this.moveRight = false; break;

	// 		case 82: /*R*/ this.moveUp = false; break;
	// 		case 70: /*F*/ this.moveDown = false; break;

	// 	}

	// };

	this.update = function( delta ) {

		if ( this.enabled === false ) return;

		if (this.disabled === true) return;

		if ( this.heightSpeed ) {

			var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed;
		var max = 0.96;
		var min = 1 - max;

		var fwd = ( this.moveForward ) ? -actualMoveSpeed : 0;
		this.smoothMoveForward =  ( fwd * min) + (this.smoothMoveForward * max); 
		this.object.translateZ(this.smoothMoveForward);

		var bkwd = ( this.moveBackward ) ? actualMoveSpeed : 0;
		this.smoothMoveBackward =  (bkwd * min) + (this.smoothMoveBackward * max); 
		this.object.translateZ(this.smoothMoveBackward);

		var lft = ( this.moveLeft) ? -actualMoveSpeed : 0;
		this.smoothMoveLeft =  (lft * min) + (this.smoothMoveLeft * max); 
		this.object.translateX(this.smoothMoveLeft);

		var rht = ( this.moveRight) ? actualMoveSpeed : 0;
		this.smoothMoveRight =  (rht * min) + (this.smoothMoveRight * max); 
		this.object.translateX(this.smoothMoveRight);

		if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
		if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

		var actualLookSpeed = delta * this.lookSpeed;

		if ( ! this.activeLook ) {

			actualLaookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if ( this.constrainVertical ) {

			verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin );

		}


		////// LOOK HORIZONTAL
		// console.log(this.mouseX);
		if ((this.mouseX < this.centerRect)&&(this.mouseX > -this.centerRect)) this.mouseX = 0;
		this.mouseXSmoothed = (this.mouseXSmoothed * 0.9) + (this.mouseX * 0.1);
		this.lon += this.mouseXSmoothed * actualLookSpeed;



		this.mouseYSmoothed = (this.mouseYSmoothed * 0.9) + (this.mouseY * 0.1);
		// LOOOK VERTICALLUY
		if ( this.lookVertical ) { 
			this.lat += this.mouseYSmoothed * actualLookSpeed;

		} else { 

		///// MOVE AND LOOK VERTICALLY - DRIFTY

					var scaledMouse = 0;
					if (((this.object.position.y >= this.minimumHeight)&&(this.mouseY < 0))||((this.object.position.y <= this.maximumHeight)&&(this.mouseY > 0))) {
						if ((this.mouseY > this.centerRect)||(this.mouseY < -this.centerRect)) {
							scaledMouse = (this.mouseY * this.heightDriftSpeed);
						}
					} 
					this.smoothHeightDrift = (this.smoothHeightDrift * 0.9) + (scaledMouse * 0.1);

					this.object.translateY(this.smoothHeightDrift);
					this.targetPositionY = 20 - (this.object.position.y * 0.6);

					// console.log(this.object.position.y, this.targetPositionY);

		}

		///// CONFUSING MATH

		this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
		this.phi = THREE.Math.degToRad( 90 - this.lat );

		this.theta = THREE.Math.degToRad( this.lon );

		if ( this.constrainVertical ) {

			this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

		}

		//// MOVE THIS STUFF OK 

		var targetPosition = this.target, position = this.object.position;

		targetPosition.x = (position.x) + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
		targetPosition.y = this.targetPositionY;
		targetPosition.z = (position.z) + 100 * Math.sin( this.phi ) * Math.sin( this.theta );


		this.object.lookAt( targetPosition );

	};

	function contextmenu( event ) {

		event.preventDefault();

	}

	this.dispose = function() {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );
		this.domElement.removeEventListener( 'mousedown', _onMouseDown, false );
		this.domElement.removeEventListener( 'mousemove', _onMouseMove, false );
		this.domElement.removeEventListener( 'mouseup', _onMouseUp, false );

		window.removeEventListener( 'keydown', _onKeyDown, false );
		window.removeEventListener( 'keyup', _onKeyUp, false );

	};

	var _onMouseMove = bind( this, this.onMouseMove );
	var _onMouseDown = bind( this, this.onMouseDown );
	var _onMouseUp = bind( this, this.onMouseUp );
	var _onKeyDown = bind( this, this.onKeyDown );
	var _onKeyUp = bind( this, this.onKeyUp );

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );
	this.domElement.addEventListener( 'mousemove', _onMouseMove, false );
	this.domElement.addEventListener( 'mousedown', _onMouseDown, false );
	this.domElement.addEventListener( 'mouseup', _onMouseUp, false );

	window.addEventListener( 'keydown', _onKeyDown, false );
	window.addEventListener( 'keyup', _onKeyUp, false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	}

	this.handleResize();

};



