import * as three from 'three';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new three.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// create just one triangle
const front = Math.tan(Math.PI / 6)
const back = Math.cos(Math.PI / 6)
  // create just one triangle
const vertices = [
    -1, 1, 1, // 0: left top front
    -1, -1, 1, // 1: left bottom front
    1, -1, 1, // 2: right bottom front
    1, 1, 1, // 3: right top front
    1, -1, -1, // 4: right bottom back
    1, 1, -1, // 5: right top back
    -1, -1, -1, // 6: left bottom back
    -1, 1, -1, // 7: left top back
    0, 1, 0, // 8: top middle
    0, -1, 0, // 9: bottom middle
]
const faces = [
    0, 1, 2, // front 1
    0, 2, 3, // front 2
    3, 2, 4, // right 1
    3, 4, 5, // right 2
    5, 4, 6, // back 1
    5, 6, 7, // back 2
    7, 6, 1, // left 1
    7, 1, 0, // left 2
    8, 0, 3, // top front
    8, 3, 5, // top right
    8, 5, 7, // top back
    8, 7, 0, // top left
    9, 2, 1, // bottom front
    9, 4, 2, // bottom right
    9, 6, 4, // bottom back
    9, 1, 6, // bottom left
]
const geometry = new three.PolyhedronGeometry(vertices, faces, 0.5, 0)
const material = new three.MeshNormalMaterial()

const count = 500;
let meshes: three.Mesh<any>[] = [];
for ( var i = 0; i < count; i ++ ) {
    var mesh = new three.Mesh(geometry, material);

	mesh.scale.set(0.5, 1, 0.5);
    scene.add(mesh);
    meshes.push(mesh);

    // initial individual transformation
    mesh.position.set(- 5 + Math.random() * 20, 20 * Math.random(), -5 + Math.random() * 20);
    mesh.rotation.x += Math.PI * Math.random();
    mesh.rotation.y += Math.PI * Math.random();

}

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	for (let mesh of meshes) {
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.01; 
	}

	renderer.render( scene, camera );
}

animate();