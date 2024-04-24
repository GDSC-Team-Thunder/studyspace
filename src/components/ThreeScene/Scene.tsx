import { useRef, useEffect } from 'react';
import * as THREE from 'three';

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
      const renderer = new THREE.WebGLRenderer({antialias: true, alpha: false});
      // TODO: Find a way to not hardcode the size
      renderer.setSize(400, 400);

      renderer.setClearColor(0x000000);

      renderer.setPixelRatio(window.devicePixelRatio);

      // refContainer.current gives us the DOM element referenced
      refContainer.current.appendChild(renderer.domElement);

      const starGeometry = new THREE.SphereGeometry(0.03, 6, 6);
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const stars: THREE.Mesh[] = [];

      for (let i = 0; i < 3000; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
        star.position.set(x, y, z);
        scene.add(star);
        stars.push(star);
      }

      const geometry = new THREE.BoxGeometry(1, 1, 2);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // Black edges
      const faceMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White faces

      const spaceship = new THREE.Mesh(geometry, faceMaterial);
      scene.add(spaceship);

      const wireframe = new THREE.LineSegments(
        new THREE.WireframeGeometry(geometry),
        edgeMaterial
      );

      spaceship.add(wireframe); // Add wireframe as a child of spaceship

      camera.position.z = 3;
      camera.position.y = 1.5;
      spaceship.rotation.x = 0.3;

      let decrement = 0.03;

      const animate = () => {
        requestAnimationFrame(animate);

        if (spaceship.position.z > -10) {
          spaceship.position.z -= decrement;
          if (decrement > 0) {
            decrement -= 0.00001;
          }
        }

        spaceship.rotation.z += 0.02;

        console.log(spaceship.position.z);

        stars.forEach(star => {
            star.position.z += 0.1; // Increase star speed
          if (star.position.z > 50) {
            // If a star moves out of the view, reset its position
            star.position.z = -50;
            star.position.x = THREE.MathUtils.randFloatSpread(100);
            star.position.y = THREE.MathUtils.randFloatSpread(100);
          }
        });

        renderer.render(scene, camera);
      };

      animate();

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

    return <div ref={refContainer} />;
}

export default Scene;
