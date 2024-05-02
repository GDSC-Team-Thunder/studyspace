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
      const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
      // TODO: Find a way to not hardcode the size
      renderer.setSize(400, 400);

      renderer.setClearColor(0x000000);

      renderer.setPixelRatio(window.devicePixelRatio);

      // refContainer.current gives us the DOM element referenced
      refContainer.current.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const spaceship = new THREE.Mesh(geometry, material);
      scene.add(spaceship);

      camera.position.z = 3;
      camera.position.y = 2.5;

      const animate = () => {
        requestAnimationFrame(animate);

        spaceship.rotation.x += 0.01;
        spaceship.rotation.y += 0.01;

        spaceship.position.z -= 0.05;

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
