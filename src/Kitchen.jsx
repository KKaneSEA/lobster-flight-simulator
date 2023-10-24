import "./App.css";

import {
  useMatcapTexture,
  useTexture,
  Center,
  Text3D,
  OrbitControls,
  useGLTF,
  MeshPortalMaterial,
  CameraControls,
  Environment,
  KeyboardControls,
  useKeyboardControls,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useState, useEffect, useRef, useMemo } from "react";
import { easing } from "maath";
import {
  Debug,
  RigidBody,
  Physics,
  CylinderCollider,
  CuboidCollider,
  BallCollider,
  RapierRigidBody,
  useRapier,
  quat,
  vec3,
  euler,
} from "@react-three/rapier";

export default function Kitchen(props) {
  const lobsterRef = useRef();
  const stockpotsRef = useRef();
  const { rapier, world } = useRapier();
  const [rotateY, setRotateY] = useState(0);
  const [position1, setPosition1] = useState(-1.9);
  const sphere1 = useRef();

  const box = useRef();
  const rigidBody = useRef < RapierRigidBody > null;

  const [hovered, setHovered] = useState(false);

  const map = useTexture("./maptexture1.jpg");
  const lobster = useGLTF("./models/lobster.glb");
  const stockpot = useGLTF("./models/stockpot.glb");

  console.log(stockpot);

  const animations = useAnimations(stockpot.animations, stockpot.scene);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const handleButtonUp = (state) => {
    console.log("buttonup");
    console.log(lobsterRef.current);
    if (position1 <= -0.5) {
      setPosition1(position1 + 0.22);
    }
  };

  function handleButtonDown(evt) {
    if (position1 >= -3.3) {
      setPosition1(position1 - 0.22);
    } else return;

    console.log(position1);
  }

  useFrame((state, delta) => {
    sphere1.current.rotation.y -= delta * 0.35;
    stockpotsRef.current.rotation.y += delta * 0.2;
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const collisionEnter = () => {
    console.log("enter collision");
  };

  return (
    <>
      <OrbitControls
        minDistance={5}
        maxDistance={6}
        target={[-0.7, -0.8, -2.2]}
        enablePan={false}
        enableRotate={false}
      />
      <Environment preset="apartment" />

      <Physics>
        <RigidBody
          key={"1a"}
          type="fixed"
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders="trimesh"
          position={[-18.05, -2.5, -13.8]}
        >
          <primitive
            ref={stockpotsRef}
            object={stockpot.scene}
            // position={[-0.5, -1.7, -1]}
            // rotation={[20.15, -80.05, 0.09]}
            scale={0.3}
          />
        </RigidBody>

        <RigidBody
          canSleep={false}
          type="fixed"
          ref={lobsterRef}
          position={[-1.5, position1, -5]}
          rotation={[20.15, -80.05, 0.09]}
          // scale={0.9}
        >
          {/* <CylinderCollider
            position={[0.38, 0.2, 0.5]}
            args={[1, 0.79]}
            rotation={[-8, -79.2, 28.5]}
          /> */}

          <primitive
            ref={lobsterRef}
            object={lobster.scene}
            // position={[-1.5, position1, -5]}
            // rotation={[20.15, -80.05, 0.09]}
            scale={0.5}
          />
        </RigidBody>

        <Text3D
          className="upDownButton"
          font="./fonts/Inconsolata_Regular.json"
          size={0.3}
          height={0.1}
          curveSegments={20}
          bevelEnabled
          bevelThickness={0.0008}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={10}
          rotation-x={-0.1}
          rotation-y={0.1}
          rotation-z={0.03}
          position={[0.8, -2.6, -5]}
          onClick={(e) => {
            handleButtonUp();
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {" "}
          UP
          <meshStandardMaterial metalness={0.2} roughness={0} color={"black"} />
        </Text3D>
        <Text3D
          font="./fonts/Inconsolata_Regular.json"
          size={0.3}
          height={0.1}
          curveSegments={20}
          bevelEnabled
          bevelThickness={0.0008}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={10}
          rotation-x={-0.1}
          rotation-y={0.1}
          rotation-z={0.03}
          position={[0.8, -3, -5]}
          onClick={(e) => {
            handleButtonDown();
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          DOWN
          <meshStandardMaterial metalness={0.2} roughness={0} color={"black"} />
        </Text3D>

        <mesh position={[-1.9, 0, -1.9]} rotation={[0, 0, 0]} ref={sphere1}>
          <sphereGeometry args={[80, 64, 64]} />
          <meshStandardMaterial map={map} side={THREE.BackSide} />
        </mesh>
      </Physics>
    </>
  );
}
