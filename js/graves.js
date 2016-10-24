function Grave() {
  var _this = this;
  var url, model, w, h, depth, size;
  var log = true;

  this.size = 10;
  this.depth = _this.size * 0.1;
  this.w = _this.size * 0.5;
  this.h = _this.size;
  this.image = null;

  this.rise = function() {
    console.log("Grave.rise");
    _this.h = (_this.image) ? (_this.w / 800) * _this.image.height : _this.size;
    _this.model.geometry = new THREE.BoxGeometry( _this.w, _this.h, _this.depth);
    _this.model.position.y = -_this.h/2;
    var tweenPosition = new TWEEN.Tween(_this.model.position)
      .to({ y: (_this.h/2)+0.5 }, 6000)
      .onUpdate(function() {
        console.log();
      })
      .onComplete(function() {})
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

  };

  this.init = function(x, z) {

    var initPromise = new Promise(function(resolve, reject) {


        _this.geometry = new THREE.BoxGeometry( _this.w, _this.h, _this.depth);
        _this.model = new THREE.Mesh(_this.geometry);
        _this.model.position.y = -_this.h/2;
        _this.model.position.x = x;
        _this.model.position.z = z;
        _this.model.receiveShadow = true;
        _this.model.castShadow = true;

        scene.add( _this.model );
        console.log("Grave.init");

        _this.texturise().then(function(image) {
          _this.image = image;
          _this.rise();
          resolve();
          //console.log(image);
        });
        //resolve();

    });

    return initPromise;
  };

  this.texturise = function() {


      console.log("Grave.texturise");
      shuffledIndex = (shuffledIndex < shuffled.length - 1) ? shuffledIndex + 1 : 0;
      _this.url = websites[shuffled[shuffledIndex]];

      var texturePromise = new Promise(function(resolve, reject) {

        while (_this.url.indexOf("%2F") !== -1) {
          var index = _this.url.indexOf("%2F");
          _this.url = _this.url.substr(0, index + 1) + "25" + _this.url.substr(index + 1);
        }
        while (_this.url.indexOf("%40") !== -1) {
          var index = _this.url.indexOf("%40");
          _this.url = _this.url.substr(0, index + 1) + "25" + _this.url.substr(index + 1);
        }

        var loader = new THREE.TextureLoader();
        var texture  = loader.load( "graves/" + _this.url, function() {
          texture.minFilter = THREE.LinearFilter;
          try {
            dummyCtx.drawImage(texture.image,0,0, 1, 1);
            var c = dummyCtx.getImageData(0, 0, 1, 1).data;
            var rgb = "rgb("+c[0]+","+c[1]+","+c[2]+")";
            var colour = new THREE.MeshPhongMaterial( {color: rgb} );
          } catch(e) {
            var colour = new THREE.MeshPhongMaterial( {color: "rgb(255,255,255)"} );
          }
          var website = new THREE.MeshBasicMaterial( { map: texture, needsUpdate: true});
          var materialArray = [colour,colour,colour,colour,website,website,];
          var material = new THREE.MeshFaceMaterial(materialArray);

          _this.model.material = material;
          _this.model.needsUpdate = true;

          resolve(texture.image);

        });
      });

      return texturePromise;
  };
}


// function riseTombstone(grave) {

//     grave.position.y = -grave.tombHeight/2;
//     var tweenPosition = new TWEEN.Tween(grave.position)
//       .to({
//         y: (grave.tombHeight/2)+0.5,
//       }, 6000)
//       .onUpdate(function() {
//         //camera.lookAt(destination);
//       })
//       .onComplete(function() {
//       })
//       .easing(TWEEN.Easing.Quadratic.InOut)
//       .start();
// }


// function createTombStone(x, z) {


//   var createPromise = new Promise(function(resolve, reject) {

//     var texturePromise = randomTexture();

//     texturePromise.then(function(texture) {


//       var tombSize = 10;
//       var tombW = tombSize * 0.5;
//       var tombH = (texture.materials[4].map.image) ? (tombW / 800) * texture.materials[5].map.image.height : tombSize;
//       var tombDepth = tombSize * 0.1;
//       var geometry = new THREE.BoxGeometry( tombW, tombH, tombDepth);

//       var object = new THREE.Mesh( geometry, texture );
//       object.tombHeight = tombH;
//       object.position.y = -tombH/2;
//       object.position.x = x;
//       object.position.z = z;

//       if (shadow) object.receiveShadow = true;
//       if (shadow) object.castShadow = true;

//       scene.add( object );

//       resolve(object);


//     }, function(reason) {
//       console.log("Fail", reason);
//     });

//   });

//   return createPromise;

// };

// function randomTexture(index) {

//   var log = true;

//   var _this = this;
//   shuffledIndex = (shuffledIndex < shuffled.length - 1) ? shuffledIndex + 1 : 0;

//   this.img = websites[shuffled[shuffledIndex]];
//   if (log) console.log('1st', _this.img);
//   var promise = new Promise(function(resolve, reject) {

//       while (_this.img.indexOf("%2F") !== -1) {
//         var index = _this.img.indexOf("%2F");
//         _this.img = _this.img.substr(0, index + 1) + "25" + _this.img.substr(index + 1);
//       }
//       while (_this.img.indexOf("%40") !== -1) {
//         var index = _this.img.indexOf("%40");
//         _this.img = _this.img.substr(0, index + 1) + "25" + _this.img.substr(index + 1);
//       }
//       if (log) console.log('2nd', _this.img);

//       texture = new THREE.TextureLoader(manager).load( "graves/" + _this.img, function() {
//         texture.minFilter = THREE.LinearFilter;
//         if (log) console.log('3rd', _this.img);
//         try {
//           dummyCtx.drawImage(texture.image,0,0, 1, 1);
//           var c = dummyCtx.getImageData(0, 0, 1, 1).data;
//           var rgb = "rgb("+c[0]+","+c[1]+","+c[2]+")";

//           var colour = new THREE.MeshPhongMaterial( {color: rgb} );
//         } catch(e) {
//           var colour = new THREE.MeshPhongMaterial( {color: "rgb(255,255,255)"} );

//         }
//         var website = new THREE.MeshBasicMaterial( { map: texture, needsUpdate: true});
//         website.originalUrl = _this.img;

//         var materialArray = [colour,colour,colour,colour,website,website,];
//         var material = new THREE.MeshFaceMaterial(materialArray);
//         resolve(material);

//       });


//   });



//   return promise;
// }


// function updateRandomTexture(grave) {

//       riseTombstone(grave);
//       //console.log("updateRandomTexture", grave.material.materials[5].map.originalUrl);
//       var promise = new randomTexture();

//       promise.then(function(material) {
//         //console.log(material.materials[5].originalUrl);
//         //window.material = material;
//         grave.material = material;
//         grave.needsUpdate = true;
//       }, function(reject) {

//   });

// }
