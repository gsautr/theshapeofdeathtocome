window.onload = function() {

	var dummy = document.querySelector('canvas');
	console.log(dummy);
	dummy.width  = 800;
	dummy.height = 800;
	var dummyCtx = dummy.getContext("2d");
	var count = 100;
	window.database = [];
	function getMeta() {
		var img = document.createElement('img');
		var url = websites[count];
		var file = websites[count];

	    while (url.indexOf("%2F") !== -1) {
	      var index = url.indexOf("%2F");
	      url = url.substr(0, index + 1) + "25" + url.substr(index + 1);
	    }
	    while (url.indexOf("%40") !== -1) {
	      var index = url.indexOf("%40");
	      url = url.substr(0, index + 1) + "25" + url.substr(index + 1);
	    }
		img.src="graves/" + url;

		img.onload = function () { 
			dummyCtx.drawImage(img,0,0, img.width, img.height);
			var c = dummyCtx.getImageData(0, 0, 1, 1).data;
			var rgb = "rgb("+c[0]+","+c[1]+","+c[2]+")";
			var data = {
				width: img.width,
				height: img.height,
				url: url,
				file: file,
				rgb: rgb
			};
			//console.log(data);
			console.log(data);
			database.push(data);
			count += 1;
			setTimeout(function() {
				if (count < websites.length) getMeta();
			}, 20);
		};

	} 

	getMeta();

};