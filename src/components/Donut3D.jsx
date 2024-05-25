// src/components/Donut3D.jsx
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const Donut3D = ({ theme }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 2.3;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const donutGeometry = new THREE.TorusGeometry(0.8, 0.4, 64, 64);
    const donutMaterial = new THREE.MeshNormalMaterial();
    const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial);
    scene.add(donutMesh);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(2, 3, 4);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      donutMesh.rotation.x += 0.01;
      donutMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && mountNode) {
        if (mountNode.contains(rendererRef.current.domElement)) {
          mountNode.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (rendererRef.current && sceneRef.current) {
      const backgroundColor = theme === "light" ? 0xf0f0f0 : 0x1c1c1c;
      rendererRef.current.setClearColor(backgroundColor);
      sceneRef.current.background = new THREE.Color(backgroundColor);
    }
  }, [theme]);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen ${
        theme === "light" ? "bg-background-light" : "bg-background-dark"
      }`}
    >
      <div ref={mountRef} className="absolute inset-0"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
        <motion.div
          className={`text-center text-5xl font-bold ${
            theme === "light" ? "text-text-light" : "text-text-dark"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          just donut
        </motion.div>
        <motion.div
          className={`text-center text-xl ${
            theme === "light" ? "text-text-light" : "text-text-dark"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          thats my favorite food
        </motion.div>
        <motion.div
          className={`text-center text-lg ${
            theme === "light" ? "text-text-light" : "text-text-dark"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          dont forget to login to know more about me
        </motion.div>
      </div>
    </div>
  );
};


export default Donut3D;
