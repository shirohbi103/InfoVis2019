function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    
    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );



    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.Geometry();

    //頂点座標データを追加   
    geometry.vertices[0] = new THREE.Vector3(1,0,1);
    geometry.vertices[1] = new THREE.Vector3(0,1,1);
    geometry.vertices[2] = new THREE.Vector3(0,0,1);
    geometry.vertices[3] = new THREE.Vector3(1,1,1);

    geometry.vertices[4] = new THREE.Vector3(1,0,2);
    geometry.vertices[5] = new THREE.Vector3(0,1,2);
    geometry.vertices[6] = new THREE.Vector3(0,0,2);
    geometry.vertices[7] = new THREE.Vector3(1,1,2);
    
    
    //面指定用頂点インデックスを追加   
    geometry.faces[0] = new THREE.Face3(0,1,2);
    geometry.faces[1] = new THREE.Face3(0,3,1);
    geometry.faces[2] = new THREE.Face3(4,5,6);
    geometry.faces[3] = new THREE.Face3(4,7,5);
    
    geometry.faces[4] = new THREE.Face3(3,5,7);
    geometry.faces[5] = new THREE.Face3(1,5,3);
    geometry.faces[6] = new THREE.Face3(2,6,0);
    geometry.faces[7] = new THREE.Face3(0,6,4);

    geometry.faces[8] = new THREE.Face3(0,4,3);
    geometry.faces[9] = new THREE.Face3(3,7,4);
    geometry.faces[10] = new THREE.Face3(2,1,6);
    geometry.faces[11] = new THREE.Face3(1,6,5);

    //lighting
    geometry.computeFaceNormals();
    //マテリアル（材質）の宣言と生成
    var material =  new THREE.MeshBasicMaterial();

    material.side = THREE.DoubleSide;
    material.vertexColors = THREE.FaceColors;

    geometry.faces[0].color = new THREE.Color(1,0,0);
    geometry.faces[1].color = new THREE.Color(1,0,0);
    geometry.faces[2].color = new THREE.Color(1,0,0);
    geometry.faces[3].color = new THREE.Color(1,0,0);
    geometry.faces[4].color = new THREE.Color(1,0,0);
    geometry.faces[5].color = new THREE.Color(1,0,0);
    geometry.faces[6].color = new THREE.Color(1,0,0);
    geometry.faces[7].color = new THREE.Color(1,0,0);
    geometry.faces[8].color = new THREE.Color(1,0,0);
    geometry.faces[9].color = new THREE.Color(1,0,0);
    geometry.faces[10].color = new THREE.Color(1,0,0);
    geometry.faces[11].color = new THREE.Color(1,0,0);
    
    var Cube =  new THREE.Mesh(geometry,material);

    //シーンオブジェクトに追加 
    scene.add(Cube);
    
    document.addEventListener( 'mousedown', mouse_down_event );
    function mouse_down_event( event )
    {
	var x_win = event.clientX;
	var y_win = event.clientY;
	var vx = renderer.domElement.offsetLeft;
	var vy = renderer.domElement.offsetTop;
	var vw = renderer.domElement.width;
	var vh = renderer.domElement.height;
	var x_NDC = 2 * ( x_win - vx ) / vw - 1;
	var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );
	var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
	var p_wld = p_NDC.unproject( camera );
	var origin = camera.position;
	var direction = p_NDC.sub(camera.position).normalize();
	
	var raycaster = new THREE.Raycaster( origin, direction );
	var intersects = raycaster.intersectObject(Cube);
	
	if ( intersects.length > 0 )
	{

	    	     intersects[0].object.geometry.colorsNeedUpdate = true;
	    intersects[0].face.color.setRGB( 0, 1, 0);

	}
    }
    
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        Cube.rotation.x += 0.018;
        Cube.rotation.y += 0.018;
        renderer.render( scene, camera );
    }

}
