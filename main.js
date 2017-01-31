var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
// sets up the scene
var scene = new THREE.Scene();
// adds the camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// sets up the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('touchstart', onDocumentTouchStart, false);
document.addEventListener('touchmove', onDocumentTouchMove, false);

// adds in geometry
var geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material1 = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 0 } );
var middle = new THREE.Mesh( geometry1, material1 );
var middle2 = new THREE.Mesh( geometry1, material1 );
var middle3 = new THREE.Mesh( geometry1, material1 );
var middle4 = new THREE.Mesh( geometry1, material1 );
middle.material.visible = false;
middle2.material.visible = false;
middle3.material.visible = false;
middle4.material.visible = false;

var group = new THREE.Group();
group.add(middle);
group.add(middle2);
group.add(middle3);
group.add(middle4);

scene.add(group);

for (var i = 0; i < 700; i++){

	var positionY = 40 * Math.sin(i);
	var positionX = 40 * Math.cos(i);
	var positionY3 = 15 * Math.sin(i);
	var positionX3 = 15 * Math.cos(i);

	var positionZ = (Math.random() * (10 - (-10)) + (-10))
	var geometry = Math.random() * (2 - 0.5) + (0.5);
	var geometrySmall = Math.random() * (0.5 - 0.1) + (0.1)

	var geometry = new THREE.BoxGeometry(geometry, geometry, geometry);
	var geometrySmall = new THREE.BoxGeometry(geometrySmall, geometrySmall, geometrySmall);
	var material = new THREE.MeshNormalMaterial();

	var cube = new THREE.Mesh( geometry, material );
	var cube2 = new THREE.Mesh( geometry, material );
	var cube3 = new THREE.Mesh( geometrySmall, material );
	var cube4 = new THREE.Mesh( geometrySmall, material );
	cube.position.z = positionZ;
	cube2.position.z = positionZ;
	cube3.position.z = positionZ;
	cube4.position.z = positionZ;
	if (positionY < 0){
		cube.position.y = positionY - (Math.random() * (7 - 0) + (0));
		cube2.position.y = positionY - (Math.random() * (7 - 0) + (0));
		cube3.position.y = positionY3 - (Math.random() * (5 - 0) + (0));
		cube4.position.y = positionY3 - (Math.random() * (5 - 0) + (0));
	} else {
		cube.position.y = positionY + (Math.random() * (7 - 0) + (0));
		cube2.position.y = positionY + (Math.random() * (7 - 0) + (0));
		cube3.position.y = positionY3 + (Math.random() * (5 - 0) + (0));
		cube4.position.y = positionY3 + (Math.random() * (5 - 0) + (0));
	}
	if (positionX < 0){
		cube.position.x = positionX - (Math.random() * (7 - 0) + (0));
		cube2.position.x = positionX - (Math.random() * (7 - 0) + (0));
		cube3.position.x = positionX3 - (Math.random() * (5 - 0) + (0));
		cube4.position.x = positionX3 - (Math.random() * (5 - 0) + (0));
	} else {
		cube.position.x = positionX + (Math.random() * (7 - 0) + (0));
		cube2.position.x = positionX + (Math.random() * (7 - 0) + (0));
		cube3.position.x = positionX3 + (Math.random() * (5 - 0) + (0));
		cube4.position.x = positionX3 + (Math.random() * (5 - 0) + (0));
	}
	// cube.position.x = positionX;
	middle.add( cube );
	middle2.add( cube2 );
	middle3.add( cube3 );
	middle4.add( cube4 );
}
middle.rotation.x = THREE.Math.degToRad(90)
middle2.rotation.y = THREE.Math.degToRad(90);
middle3.rotation.x = THREE.Math.degToRad(90);
middle4.rotation.y = THREE.Math.degToRad(90);

camera.position.z = 100;
// adds the light
var light = new THREE.PointLight( 0xFFFF00 );
light.position.set( 10, 0, 25 );
scene.add( light );

var scaleParticles = function(){
	// TweenMax.to(middle.scale, 1, {x: 1.05, repeat: -1, yoyo:true });
	// TweenMax.to(middle.scale, 1, {y: 1.05, repeat: -1, yoyo:true });
	// TweenMax.to(middle.scale, 1, {z: 1.05, repeat: -1, yoyo:true });
}
// animates the cube
var render = function () {
  requestAnimationFrame( render );

  middle.rotation.z += 0.009;
  middle.rotation.x -= 0.009;

  middle2.rotation.z -= 0.009;
  middle2.rotation.y -= 0.009;

  middle3.rotation.z += 0.009;
  middle3.rotation.y -= 0.009;

  middle4.rotation.z -= 0.009;
  middle4.rotation.y -= 0.009;

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
  group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
  renderer.render(scene, camera);
};

render();
scaleParticles();


function onDocumentMouseDown(event) {
  event.preventDefault();
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  document.addEventListener('mouseout', onDocumentMouseOut, false);
  mouseXOnMouseDown = event.clientX - windowHalfX;
  targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
}

function onDocumentMouseUp(event) {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
  document.removeEventListener('mousemove', onDocumentMouseMove, false);
  document.removeEventListener('mouseup', onDocumentMouseUp, false);
  document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentTouchStart(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
  }
}
