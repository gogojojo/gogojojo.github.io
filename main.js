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
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// document.addEventListener('mousedown', onDocumentMouseDown, false);
// document.addEventListener('touchstart', onDocumentTouchStart, false);
// document.addEventListener('touchmove', onDocumentTouchMove, false);

// adds in geometry
var geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material1 = new THREE.MeshLambertMaterial( { color: 0x000000, opacity: 0} );
var middle = new THREE.Mesh( geometry1, material1 );
middle.material.visible = false;

var group = new THREE.Group();
middle.position.y = 0;
middle.position.x = window.innerWidth/2*-1;
group.add(middle);

scene.add(group);
var rainMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 1, transparent: true } );
var normalMat = new THREE.MeshNormalMaterial({opacity: 0, transparent: true})
// rain
for (var i = 0; i < window.innerWidth; i++){

	var positionZ = (Math.random() * (20 - (-20)) + (-20))
	var geometry = Math.random() * (5 - 0.5) + (0.5);

	var geometry = new THREE.BoxGeometry(geometry, geometry, geometry);

	var cube = new THREE.Mesh( geometry, normalMat );

	cube.position.z = positionZ;
	cube.position.y = window.innerHeight;
	cube.position.x = i;
	// cube.position.x = positionX;
	middle.add( cube );
}

middle.rotation.x = THREE.Math.degToRad(180);
// sun
var sunGeometry = new THREE.SphereGeometry( 100, 6, 6 );
var sunMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFB85, opacity: 1, transparent: true } );

var sunCube = new THREE.Mesh( sunGeometry, sunMaterial );
sunCube.position.y = window.innerHeight;
middle.position.x = window.innerWidth/2*-1;
group.add( sunCube );


camera.position.z = 500;
// adds the light
var light = new THREE.PointLight( 0xffffff );
light.position.set( 10, 0, 200 );
scene.add( light );

// animates the cube
var render = function () {
  requestAnimationFrame( render );
  for (var i = 0; i < middle.children.length; i++){
  	middle.children[i].rotation.x += 0.1;
  	middle.children[i].rotation.y += 0.1;
  	middle.children[i].rotation.z += 0.1;
  }

  	sunCube.rotation.y += 0.05;

  cube.geometry.verticesNeedUpdate = true;
  camera.updateProjectionMatrix();
  group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
  renderer.render(scene, camera);
};

render();


// function onDocumentMouseDown(event) {
//   event.preventDefault();
//   document.addEventListener('mousemove', onDocumentMouseMove, false);
//   document.addEventListener('mouseup', onDocumentMouseUp, false);
//   document.addEventListener('mouseout', onDocumentMouseOut, false);
//   mouseXOnMouseDown = event.clientX - windowHalfX;
//   targetRotationOnMouseDown = targetRotation;
// }

// function onDocumentMouseMove(event) {
//   mouseX = event.clientX - windowHalfX;
//   targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
// }

// function onDocumentMouseUp(event) {
//   document.removeEventListener('mousemove', onDocumentMouseMove, false);
//   document.removeEventListener('mouseup', onDocumentMouseUp, false);
//   document.removeEventListener('mouseout', onDocumentMouseOut, false);
// }

// function onDocumentMouseOut(event) {
//   document.removeEventListener('mousemove', onDocumentMouseMove, false);
//   document.removeEventListener('mouseup', onDocumentMouseUp, false);
//   document.removeEventListener('mouseout', onDocumentMouseOut, false);
// }

// function onDocumentTouchStart(event) {
//   if (event.touches.length == 1) {
//     event.preventDefault();
//     mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
//     targetRotationOnMouseDown = targetRotation;
//   }
// }

// function onDocumentTouchMove(event) {
//   if (event.touches.length == 1) {
//     event.preventDefault();
//     mouseX = event.touches[0].pageX - windowHalfX;
//     targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
//   }
// }
var playing = false;
for (var i = 0; i < middle.children.length; i++){
	var time = (Math.random() * (10 - (1)) + (1))
	TweenMax.to(middle.children[i].position, time ,{y: window.innerHeight*-1, repeat: -1})
}

document.querySelector('body').addEventListener("click", function(){
	if (!playing){
		playing = true;
		document.querySelector('audio').play();

		TweenMax.to('#vince', 1.5, {opacity: 1, delay: 1})
		TweenMax.to('#staples', 1.5, {opacity: 1, delay: 3})
		TweenMax.to('#name', 1.5, {opacity: 0, delay: 5})
		TweenMax.to('#rain', 1.5, {opacity: 1, delay: 7})
		TweenMax.to('#come', 1.5, {opacity: 1, delay: 9})
		TweenMax.to('#down', 1.5, {opacity: 1, delay: 11})
		TweenMax.to('#rcd', 1.5, {opacity: 0, delay: 17})

		TweenMax.to(sunCube.position, 5 ,{y: window.innerHeight*-1, delay: 17})
		TweenMax.to('body', 5 ,{backgroundColor: "black", delay: 17})

		for (var i = 0; i < middle.children.length; i++){
			TweenMax.to(middle.children[i].material, 1 ,{opacity: 1, delay: 13.5})
		}

		for (var i = 0; i < middle.children.length; i++){
			TweenMax.to(middle.children[i].material, 4 ,{opacity: 0, delay: 25})
		}

		TweenMax.to(middle.rotation, 1, {x: THREE.Math.degToRad(360), delay: 31, onComplete(){
			for (var i = 0; i < middle.children.length; i++){
				middle.children[i].material = rainMaterial;
				TweenMax.to(middle.children[i].material, 1 ,{opacity: 1})
			}
		}});

		setTimeout(function(){
			TweenMax.to(middle.rotation, 1, {x:THREE.Math.degToRad(90)});
			TweenMax.to('body', 1 ,{backgroundColor: "white"})
			TweenMax.to(camera.position, 3, {z: -500, repeat: 9, yoyo: true, onComplete(){
				TweenMax.to(camera.position, 3, {z: 500})
			}})
			TweenMax.to('body', 3, {backgroundColor: "#93b7f2",repeat: 10, yoyo: true, onComplete(){
			}})

		}, 64000)

		setTimeout(function(){
			TweenMax.to(middle.rotation, 1, {x:THREE.Math.degToRad(180)});
			TweenMax.to('body', 5 ,{backgroundColor: "black"})
			TweenMax.fromTo(sunCube.position, 5 ,{y: window.innerHeight}, {y: window.innerHeight*-1})
		}, 97000)
	}
})

