THREE.FirstPersonControls=function(t,e){function i(t,e){var i=.6,s=t*i+e*(1-i);return t=e,s}function s(t){t.preventDefault()}function o(t,e){return function(){e.apply(t,arguments)}}var h=10;this.object=t,this.object.position.y+=h,this.target=new THREE.Vector3(0,h,0),this.domElement=void 0!==e?e:document,this.enabled=!0,this.movementSpeed=1,this.lookSpeed=.005,this.smoothedLookSpeed=0,this.smoothHeightAdjust=0,this.smoothMovementSpeed=0,this.verticalDelta=0,this.wheelDelta=0,this.lookVertical=!0,this.lookHorizontal=!0,this.autoForward=!1,this.activeLook=!0,this.heightSpeed=!1,this.heightCoef=1,this.heightMin=0,this.heightMax=1,this.constrainVertical=!1,this.verticalMin=0,this.verticalMax=Math.PI,this.autoSpeedFactor=0,this.mouseX=0,this.mouseY=0,this.lat=0,this.lon=0,this.phi=0,this.theta=0,this.moveForward=!1,this.moveBackward=!1,this.moveLeft=!1,this.moveRight=!1,this.mouseDragOn=!1,this.viewHalfX=0,this.viewHalfY=0,this.domElement!==document&&this.domElement.setAttribute("tabindex",-1);var a=this;window.addEventListener("mousewheel",function(t){var e=200;a.verticalDelta=THREE.Math.mapLinear(t.wheelDelta,-e,e,-.2,.2),a.verticalDelta>.2&&(a.verticalDelta=.2),a.verticalDelta<-.2&&(a.verticalDelta=-.2),a.wheelDelta=t.wheelDelta},!0),this.handleResize=function(){this.domElement===document?(this.viewHalfX=window.innerWidth/2,this.viewHalfY=window.innerHeight/2):(this.viewHalfX=this.domElement.offsetWidth/2,this.viewHalfY=this.domElement.offsetHeight/2)},this.onMouseDown=function(t){this.domElement!==document&&this.domElement.focus(),t.preventDefault(),t.stopPropagation(),this.activeLook,this.mouseDragOn=!0},this.onMouseUp=function(t){if(t.preventDefault(),t.stopPropagation(),this.activeLook)switch(t.button){case 0:this.moveForward=!1;break;case 2:this.moveBackward=!1}this.mouseDragOn=!1},this.onMouseMove=function(t){this.domElement===document?(this.mouseX=t.pageX-this.viewHalfX,this.mouseY=t.pageY-this.viewHalfY):(this.mouseX=t.pageX-this.domElement.offsetLeft-this.viewHalfX,this.mouseY=t.pageY-this.domElement.offsetTop-this.viewHalfY)},this.onKeyDown=function(t){switch(t.keyCode){case 38:case 87:this.moveForward=!0;break;case 37:case 65:this.moveLeft=!0;break;case 40:case 83:this.moveBackward=!0;break;case 39:case 68:this.moveRight=!0;break;case 82:this.moveUp=!0;break;case 70:this.moveDown=!0}},this.onKeyUp=function(t){switch(t.keyCode){case 38:case 87:this.moveForward=!1;break;case 37:case 65:this.moveLeft=!1;break;case 40:case 83:this.moveBackward=!1;break;case 39:case 68:this.moveRight=!1;break;case 82:this.moveUp=!1;break;case 70:this.moveDown=!1}};var n=0,m=0,r=0,l=0,d=0,v=0;this.update=function(t){if(this.enabled!==!1){if(this.heightSpeed){var e=THREE.Math.clamp(this.object.position.y,this.heightMin,this.heightMax),i=e-this.heightMin;this.autoSpeedFactor=t*(i*this.heightCoef)}else this.autoSpeedFactor=0;var s=t*this.movementSpeed,o=this.constrainVertical?Math.PI/(this.verticalMax-this.verticalMin):1;if(this.lookVertical)(this.moveForward||this.autoForward&&!this.moveBackward)&&this.object.translateZ(-(s+this.autoSpeedFactor)),this.moveBackward&&this.object.translateZ(s),this.moveUp&&this.object.translateY(s),this.moveDown&&this.object.translateY(-s),this.lat-=this.mouseY*m*o;else{var h=.96,a=.2;0===this.wheelDelta&&(this.verticalDelta=0),this.moveForward&&this.object.position.y<100&&(this.verticalDelta=a*(1-h)),this.moveBackward&&(this.verticalDelta=-a*(1-h)),this.object.position.y<.8&&(this.smoothHeightAdjust=.81),this.smoothHeightAdjust=this.smoothHeightAdjust*h+this.verticalDelta,this.lat+=-1*this.smoothHeightAdjust*o,this.object.translateY(this.smoothHeightAdjust)}if(this.lookHorizontal)this.moveLeft&&this.object.translateX(-s),this.moveRight&&this.object.translateX(s),this.lookHorizontal&&(this.lon+=this.mouseX*m);else{var h=.96,n=0;this.moveLeft&&(n=-1*(1-h)),this.moveRight&&(n=1*(1-h)),this.smoothedLookSpeed=this.smoothedLookSpeed*h+n,this.lon+=this.smoothedLookSpeed}var m=t*this.lookSpeed;this.activeLook||(m=0),this.lat=Math.max(-85,Math.min(85,this.lat)),this.phi=THREE.Math.degToRad(90-this.lat),this.theta=THREE.Math.degToRad(90+this.lon),this.constrainVertical&&(this.phi=THREE.Math.mapLinear(this.phi,0,Math.PI,this.verticalMin,this.verticalMax));var r=this.target,l=this.object.position,h=.999;this.smoothMovementSpeed=this.smoothMovementSpeed*h+this.movementSpeed*(1-h),this.autoForward&&(l.z+=this.smoothMovementSpeed),r.x=l.x+100*Math.sin(this.phi)*Math.cos(this.theta),r.y=l.y+100*Math.cos(this.phi),r.z=l.z+100*Math.sin(this.phi)*Math.sin(this.theta),this.object.lookAt(r)}},this.dispose=function(){this.domElement.removeEventListener("contextmenu",s,!1),this.domElement.removeEventListener("mousedown",u,!1),this.domElement.removeEventListener("mousemove",c,!1),this.domElement.removeEventListener("mouseup",p,!1),window.removeEventListener("keydown",w,!1),window.removeEventListener("keyup",f,!1)};var c=o(this,this.onMouseMove),u=o(this,this.onMouseDown),p=o(this,this.onMouseUp),w=o(this,this.onKeyDown),f=o(this,this.onKeyUp);this.domElement.addEventListener("contextmenu",s,!1),this.domElement.addEventListener("mousemove",c,!1),this.domElement.addEventListener("mousedown",u,!1),this.domElement.addEventListener("mouseup",p,!1),window.addEventListener("keydown",w,!1),window.addEventListener("keyup",f,!1),this.handleResize()};