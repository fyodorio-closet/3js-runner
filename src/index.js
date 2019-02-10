const THREE = require('three');
const OrbitControls = require('three-orbitcontrols');

// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 9999);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.body.appendChild( renderer.domElement );

// Cube object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -2
cube.position.z = -5;
scene.add(cube);

// Cone object (textured)
let textureLoader = new THREE.TextureLoader();
textureLoader.load('./WaterDiffuse.jpg', texture => {
		const coneGeometry = new THREE.ConeGeometry( 0.5, 1, 4 );
		const coneMaterial = new THREE.MeshLambertMaterial( { map: texture } );
		const cone = new THREE.Mesh( coneGeometry, coneMaterial);
		cone.position.z = -5;
		scene.add(cone);
	},
);

// Sphere object
const sphereGeometry = new THREE.SphereGeometry( 0.5, 8, 8 );
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.z = -5;
sphere.position.x = 2;
scene.add(sphere);

// Light source
const light = new THREE.PointLight(0xFFFFFF);
light.position.x = 0;
light.position.y = 10;
light.position.z = 0;
let lightAngle = 0;
scene.add(light);

// Camera
camera.position.z = 5;
const controls = new OrbitControls( camera );

// Rendering loop
function animate() {
	requestAnimationFrame( animate );

	// Rotate cube
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	// Move light
	lightAngle += 3;
	if (lightAngle > 360) lightAngle = 0;
	light.position.x = 5 * Math.cos(lightAngle * Math.PI / 180);
	light.position.z = 5 * Math.sin(lightAngle * Math.PI / 180);

	renderer.render( scene, camera );
}

animate();
