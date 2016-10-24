function riseTombstone(grave) {

    grave.position.y = -grave.tombHeight/2;
    var tweenPosition = new TWEEN.Tween(grave.position)
      .to({
        y: (grave.tombHeight/2)+0.5,
      }, 6000)
      .onUpdate(function() {
        //camera.lookAt(destination);
      })
      .onComplete(function() {
      })
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
}

function createTombStone(x, z) {


  var createPromise = new Promise(function(resolve, reject) {

    var texturePromise = randomTexture();

    texturePromise.then(function(texture) {


      var tombSize = 10;
      var tombW = tombSize * 0.5;
      var tombH = (texture.materials[4].map.image) ? (tombW / 800) * texture.materials[5].map.image.height : tombSize;
      var tombDepth = tombSize * 0.1;
      var geometry = new THREE.BoxGeometry( tombW, tombH, tombDepth);

      var object = new THREE.Mesh( geometry, texture );
      object.tombHeight = tombH;
      object.position.y = -tombH/2;
      object.position.x = x;
      object.position.z = z;

      if (shadow) object.receiveShadow = true;
      if (shadow) object.castShadow = true;

      scene.add( object );

      resolve(object);


    }, function(reason) {
      console.log("Fail", reason);
    });

  });

  return createPromise;

};

function randomTexture() {

  shuffledIndex = (shuffledIndex < shuffled.length - 1) ? shuffledIndex + 1 : 0;
  var randImg = websites[shuffled[shuffledIndex]];
  
  var promise = new Promise(function(resolve, reject) {


      while (randImg.indexOf("%2F") !== -1) {
          var index = randImg.indexOf("%2F");
          randImg = randImg.substr(0, index + 1) + "25" + randImg.substr(index + 1);
        }
      while (randImg.indexOf("%40") !== -1) {
        var index = randImg.indexOf("%40");
        randImg = randImg.substr(0, index + 1) + "25" + randImg.substr(index + 1);
      }

      texture = new THREE.TextureLoader(manager).load( "graves/" + randImg, function() {
      texture.minFilter = THREE.LinearFilter;
      texture.originalUrl = randImg;

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
        resolve(material);

      });


  });



  return promise;
}


function updateRandomTexture(grave) {

      riseTombstone(grave);
      //console.log("updateRandomTexture", grave.material.materials[5].map.originalUrl);
      var promise = randomTexture();

      promise.then(function(material) {
        grave.material = material;
        grave.needsUpdate = true;
      }, function(reject) {

      });

}
