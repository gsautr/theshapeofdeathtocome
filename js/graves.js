function Grave() {
  var _this = this;
  var url, model, w, h, depth, size;
  var log = true;

  this.size = 10;
  this.depth = _this.size * 0.1;
  this.w = _this.size * 0.5;
  this.h = _this.size;
  this.image = null;
  this.website = null;
  this.loadingTexture = false;

  this.rise = function() {
    //console.log("Grave.rise");
    _this.h = (_this.w / 800) * _this.website.height;
    _this.model.geometry = new THREE.BoxGeometry( _this.w, _this.h, _this.depth);
    _this.model.position.y = -_this.h/2;
    var tweenPosition = new TWEEN.Tween(_this.model.position)
      .to({ y: (_this.h/2)+0.5 }, 6000)
      .onUpdate(function() {
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
        //console.log("Grave.init");

        _this.texturise().then(function() {
          resolve();
          //console.log(image);
        });
        //resolve();

    });

    return initPromise;
  };

  this.texturise = function() {


      _this.model.position.y = -_this.h/2;
      //console.log("Grave.texturise");
      shuffledIndex = (shuffledIndex < shuffled.length - 1) ? shuffledIndex + 1 : 0;
      _this.website = websites[shuffled[shuffledIndex]];

      var texturePromise = new Promise(function(resolve, reject) {

        if (_this.loadingTexture) {

          resolve();

        } else {

          _this.loadingTexture = true;

          var loader = new THREE.TextureLoader();
          var texture  = loader.load( "graves/" + _this.website.url, function() {
            var colour = _this.website.rgb;
            texture.minFilter = THREE.LinearFilter;
            var website = new THREE.MeshBasicMaterial( { map: texture, needsUpdate: true});
            var materialArray = [colour,colour,colour,colour,website,website,];
            var material = new THREE.MeshFaceMaterial(materialArray);

            _this.model.material = material;
            _this.model.needsUpdate = true;

            _this.loadingTexture = false;

            _this.rise();
            resolve();

          });

        }



      });

      return texturePromise;
  };
}


