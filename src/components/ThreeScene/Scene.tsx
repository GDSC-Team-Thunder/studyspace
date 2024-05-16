import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Scene = () => {
  // Create a null reference to a div element
  const refContainer = useRef<HTMLDivElement>(null);

  /*
   * Use the useEffect hook to ensure the component has been mounted before
   * initializing and setting up the 3D scene. The empty dependency array
   * ensures that the scene is only initialized once, and not re-initialized
   * on every re-render during the animation loop.
   */
  useEffect(() => {
    if (!refContainer.current) return;

    // If mounted properly, create a scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // TODO: Find a way to not hardcode the size
    renderer.setSize(400, 400);
    // renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    refContainer.current.appendChild(renderer.domElement);

    // Add ambient and point light to the scene
    const ambientLight = new THREE.AmbientLight(0x404040, 100);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const starGeometry = new THREE.SphereGeometry(0.03, 6, 6);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const stars: THREE.Mesh[] = [];

    for (let i = 0; i < 5000; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
      stars.push(star);
    }

    camera.position.x = 0;
    camera.position.y = 1.5;
    camera.position.z = 3;

    const loader = new GLTFLoader();
    loader.load('spaceship.glb', (gltf) => {
      const spaceship = gltf.scene;
      scene.add(spaceship);
      spaceship.scale.set(0.8, 0.8, 0.8);
      spaceship.position.set(-2, 0, -20); // Start slightly ahead in the z-axis
      spaceship.rotation.y = Math.PI;
      spaceship.rotation.x = 0.3;

      let wobbleAngle = 0;
      const wobbleSpeed = 0.01;
      const wobbleAmplitude = 0.2;

      const animate = () => {
        stars.forEach(star => {
          star.position.z += 0.1; // Increase star speed
          if (star.position.z > 50) {
            // If a star moves out of the view, reset its position
            star.position.z = -50;
            star.position.x = THREE.MathUtils.randFloatSpread(100);
            star.position.y = THREE.MathUtils.randFloatSpread(100);
          }
        });

        wobbleAngle += wobbleSpeed;

        spaceship.rotation.z = wobbleAmplitude * Math.cos(wobbleAngle);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
    },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      }
    );

    // TODO: Reduce lag when resizing
    const handleResize = () => {
      const width = refContainer.current!.clientWidth;
      const height = refContainer.current!.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      refContainer.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={refContainer} className='rounded-3xl overflow-hidden' />;
}

export default Scene;
