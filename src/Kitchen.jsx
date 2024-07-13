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
  const stockpotsRef2 = useRef();
  const { rapier, world } = useRapier();
  const [rotateY, setRotateY] = useState(0);
  // const [position1, setPosition1] = useState(-1.9);
  const sphere1 = useRef();

  const box = useRef();
  const rigidBody = useRef < RapierRigidBody > null;

  const [hovered, setHovered] = useState(false);

  const map = useTexture("./maptexture1.jpg");
  const lobster = useGLTF("./models/lobster.glb");
  const stockpot = useGLTF("./models/stockpot.glb");

  const animations = useAnimations(stockpot.animations, stockpot.scene);

  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame(() => {
    const { forward, backward } = getKeys();

    if (forward === true) props.handleButtonUp();
    if (backward === true) props.handleButtonDown();
  });

  useFrame((state, delta) => {
    sphere1.current.rotation.y -= delta * 0.35;
    stockpotsRef.current.rotation.y += delta * 0.22;
    stockpotsRef.current.rotation.y += delta * 0.22;
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const lobsterJump = () => {
    lobsterRef.current.applyImpulse({ x: 0.0, y: 20.0, z: 0.0 }, false);

    console.log(lobsterRef.current);
  };

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

      <Physics debug>
        <RigidBody
          key={"1b"}
          type="fixed"
          gravityScale={1}
          restitution={0}
          friction={0.7}
          colliders="trimesh"
          // position={[19.05, -5, 10.8]}
          // ref={stockpotsRef}
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
          key={"1a"}
          type="fixed"
          gravityScale={1}
          ref={stockpotsRef2}
          restitution={0}
          friction={0.7}
          position={[7.05, -2, 15.8]}
        >
          <primitive
            // ref={stockpotsRef2}
            object={stockpot.scene}
            // position={[-0.5, -1.7, -1]}
            // rotation={[20.15, -80.05, 0.09]}

            scale={0.3}
          />
        </RigidBody>

        <RigidBody
          // canSleep={false}
          type="fixed"
          position={[-1.5, -1.9, -5]}
          rotation={[20.15, -80.05, 0.09]}
          ref={lobsterRef}

          // scale={0.9}
        >
          <CylinderCollider
            position={[0.38, 0.2, 0.5]}
            args={[1, 0.79]}
            rotation={[-8, -79.2, 28.5]}
          />

          <primitive
            // ref={lobsterRef}
            object={lobster.scene}
            onClick={lobsterJump}
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
          // onClick={(e) => {
          //   props.handleButtonUp();
          // }}
          onClick={lobsterJump}
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
            props.handleButtonDown();
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
