// sets up the scene
var scene = new THREE.Scene();
// adds the camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// sets up the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// adds in geometry
var geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material1 = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 0 } );
var middle = new THREE.Mesh( geometry1, material1 );
var middle2 = new THREE.Mesh( geometry1, material1 );
console.log(middle)
middle.material.visible = false;
middle2.material.visible = false;
scene.add(middle);
scene.add(middle2);





for (var i = 0; i < 1000; i++){

	var positionY = 40 * Math.sin(i);
	var positionX = 40 * Math.cos(i);
	var positionZ = (Math.random() * (20 - (-20)) + (-20))
	var geometry = Math.random() * (1 - 0.5) + (0.5)

	var geometry = new THREE.BoxGeometry(geometry, geometry, geometry);
	var material = new THREE.MeshNormalMaterial();


	var cube = new THREE.Mesh( geometry, material );
	var cube2 = new THREE.Mesh( geometry, material );
	if (positionY < 0){
		cube.position.y = positionY - (Math.random() * (7 - 0) + (0));
		cube2.position.y = positionY - (Math.random() * (7 - 0) + (0));
	} else {
		cube.position.y = positionY + (Math.random() * (7 - 0) + (0));
		cube2.position.y = positionY + (Math.random() * (7 - 0) + (0));
	}
	if (positionX < 0){
		cube.position.x = positionX - (Math.random() * (7 - 0) + (0));
		cube2.position.x = positionX - (Math.random() * (7 - 0) + (0));
	} else {
		cube.position.x = positionX + (Math.random() * (7 - 0) + (0));
		cube2.position.x = positionX + (Math.random() * (7 - 0) + (0));
	}
	// cube.position.x = positionX;
	middle.add( cube );
	middle2.add( cube2 );
}

camera.position.z = 100;
// adds the light
var light = new THREE.PointLight( 0xFFFF00 );
light.position.set( 10, 0, 25 );
scene.add( light );

var scaleParticles = function(){
	console.log(middle)
	TweenMax.to(middle.scale, 1, {x: 1.1, repeat: -1, yoyo:true });
	TweenMax.to(middle.scale, 1, {y: 1.1, repeat: -1, yoyo:true });
	TweenMax.to(middle.scale, 1, {z: 1.1, repeat: -1, yoyo:true });
}
// animates the cube
var render = function () {
  requestAnimationFrame( render );

  middle.rotation.z += 0.01
  middle2.rotation.z -= 0.009;

  for (var i = 0; i < middle.children.length; i++){
  	middle.children[i].rotation.x += 0.1;
  	middle.children[i].rotation.y += 0.1;
  	middle.children[i].rotation.z += 0.1;

  	middle2.children[i].rotation.x += 0.1;
  	middle2.children[i].rotation.y += 0.1;
  	middle2.children[i].rotation.z += 0.1;
  }

  cube.geometry.verticesNeedUpdate = true;
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
};

render();
scaleParticles();

// dat gui
var gui = new dat.GUI();
var cameraGui = gui.addFolder("camera position");
cameraGui.add(camera.position, 'x');
cameraGui.add(camera.position, 'y');
cameraGui.add(camera.position, 'z');
cameraGui.open();

var cameraGui = gui.addFolder("camera projection");
cameraGui.add(camera, "fov");
cameraGui.open();

var lightGui = gui.addFolder("light position");
lightGui.add(light.position, 'x');
lightGui.add(light.position, 'y');
lightGui.add(light.position, 'z');
lightGui.open();

var cubeGui = gui.addFolder("cube position");
cubeGui.add(cube.position, 'x');
cubeGui.add(cube.position, 'y');
cubeGui.add(cube.position, 'z');
cubeGui.open();