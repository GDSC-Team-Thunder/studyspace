import * as THREE from 'three';

const planetEvent = (scene, radius, color, position) => {
    const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({ color: color });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);

    planet.position.set(position.x, position.y, position.z);

    scene.add(planet);
};

module.exports = { planetEvent };
