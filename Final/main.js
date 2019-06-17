
function main()
{
    var volume = new KVS.LobsterData();
var screen = new KVS.THREEScreen();

    screen.init( volume, {
	width: window.innerWidth * 0.79,
        height: window.innerHeight,
	targetDom: document.getElementById('display'),
        enableAutoResize: false
    });
 

 
    draw();
    screen.loop();


	function draw()
	{

		var isovalue = 128;
		var color = 128;
		var flag = 0;
		
		var smin = volume.min_value;
		var smax = volume.max_value;
		var bounds = Bounds( volume );
		var surfaces = Isosurfaces( volume, isovalue, color,screen, flag );
		screen.scene.add( surfaces );
		screen.scene.add( bounds );

		document.getElementById('label').innerHTML =  Math.round( isovalue );
		document.getElementById('clabel').innerHTML = Math.round( isovalue );
	
		document.getElementById('isovalue').addEventListener('mousemove', function() {
			var value = +document.getElementById('isovalue').value;
			isovalue = KVS.Mix( 0, 255, value );
			document.getElementById('label').innerHTML = Math.round( isovalue );
		});

		document.getElementById('color').addEventListener('mousemove', function() {
			var value = +document.getElementById('color').value;
			color = KVS.Mix( 0, 255, value );
			document.getElementById('clabel').innerHTML = Math.round( color );
		});

		document.getElementById('apply-button').addEventListener('click', function() {
			screen.scene.remove( surfaces );
			var ivalue = +document.getElementById('isovalue').value;
			isovalue = KVS.Mix( 0, 255, ivalue );
			var cvalue = +document.getElementById('color').value;
			color = KVS.Mix( 0, 255, cvalue );
			if(document.getElementById('LR').checked){
			var reflection = 0;
			}
			else if(document.getElementById('PR').checked){
			var reflection = 1;
			}
			if(document.getElementById('GS').checked){
				if(reflection == 0){
					flag = 0;
				}
				else{
					flag = 1;
				}
			}
			else if(document.getElementById('PS').checked){
				if(reflection == 0){
					flag = 2;
					}
				else{
					flag = 3;
				}
			}
			surfaces = Isosurfaces( volume, parseInt(isovalue), parseInt(color),screen, flag );
			screen.scene.add( surfaces );
			screen.scene.add( bounds );
		});

		document.addEventListener( 'mousemove', function() {
			screen.light.position.copy( screen.camera.position );
		});

		window.addEventListener( 'resize', function() {
			screen.resize( [ window.innerWidth*0.8, window.innerHeight ] );
		});
	}


}
