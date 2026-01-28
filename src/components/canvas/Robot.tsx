import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";

interface RobotsProps {
  isMobile: boolean;
  currentAnimation: string;
}

const Robots = ({ isMobile, currentAnimation }: RobotsProps) => {
  const robot = useGLTF("./robot/source/robot.gltf");
  const groupRef = useRef<THREE.Group>(null);
  const { actions, names } = useAnimations(robot.animations, groupRef);
  const previousAnimationRef = useRef<string>("");
  useEffect(() => {
    robot.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const material = child.material as THREE.MeshStandardMaterial;

        material.color.setRGB(0.5, 0.5, 0.5);

        material.emissive.setRGB(1, 1, 1);
        material.emissiveIntensity = 1;
      }
    });

    // Starta idle animation
    if (actions["iddle"]) {
      actions["iddle"].play();
    }
  }, [robot]);

  useEffect(() => {
    if (!actions || !currentAnimation) return;

    const previousAction = actions[previousAnimationRef.current];
    const currentAction = actions[currentAnimation];

    if (currentAction && currentAnimation !== previousAnimationRef.current) {
      // Fade out previous animation
      if (previousAction) {
        previousAction.fadeOut(0.5);
      }

      // Fade in and play new animation
      currentAction.reset().fadeIn(0.5).play();

      previousAnimationRef.current = currentAnimation;
    }
  }, [currentAnimation, actions]);

  return (
    <group ref={groupRef}>
      {/* Samma starka ljussättning som i bild 1 */}
      <ambientLight intensity={4} />

      <directionalLight position={[10, 10, 10]} intensity={5} />
      <directionalLight position={[-10, 10, -10]} intensity={5} />
      <directionalLight position={[10, -10, 10]} intensity={5} />
      <directionalLight position={[-10, -10, -10]} intensity={5} />

      <primitive
        object={robot.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, 0.25]}
        rotation={[-0.01, -2.2, 0]}
      />
    </group>
  );
};

interface RobotCanvasProps {
  currentAnimation?: string;
}

const RobotCanvas = ({ currentAnimation = "iddle" }: RobotCanvasProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{
        preserveDrawingBuffer: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.5,
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Robots isMobile={isMobile} currentAnimation={currentAnimation} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default RobotCanvas;
