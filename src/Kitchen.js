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
} from "@react-three/rapier";

export default function Kitchen(props) {
  const { rapier, world } = useRapier();
  const [rotateY, setRotateY] = useState(0);
  const [position1, setPosition1] = useState(-1.9);
  const sphere1 = useRef();

  const box = useRef();
  const rigidBody = useRef();

  const [hovered, setHovered] = useState(false);

  const map = useTexture("./maptexture1.jpg");
  const lobster = useGLTF("./models/lobster.glb");
  const stockpot = useGLTF("./models/stockpot.glb");
  const stockpotsRef = useRef();
  console.log(stockpot);

  const animations = useAnimations(stockpot.animations, stockpot.scene);

  const lobsterRef = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();

  // function handleButtonUp(evt) {
  //   if (position1 <= -0.5) {
  //     // setPosition1(position1 + 0.22);
  //     rigidBody.current.applyImpulse({ x: 0, y: 5, z: 0 });
  //   } else return;

  //   console.log(position1);
  // }

  useEffect(() => {
    const action1 = animations.actions.stockpot1Action;
    action1.play();

    const action2 = animations.actions.stockpot2Action;
    action2.play();

    const action3 = animations.actions.stockpot3Action;
    action3.play();

    const action4 = animations.actions.stockpot4Action;
    action4.play();

    const action5 = animations.actions.stockpot5Action;
    action5.play();
  }, []);

  const handleButtonUp = () => {
    // lobsterRef.current.applyImpulse({ x: 0, y: 5, z: 0 });
    // console.log("jump");
    console.log("buttonup");
    const mass = lobsterRef.current.mass();
    console.log(mass);
    console.log(lobsterRef.current);
    lobsterRef.current.applyImpulse({ x: -2, y: 5, z: 0 });
    lobsterRef.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: 1,
      z: 0,
    });
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

  // useEffect(() => {
  //   if (rigidBody.current) {
  //     // A one-off "push"
  //     rigidBody.current.applyImpulse({ x: 0, y: 1, z: 0 }, true);
  //     console.log("here");

  //     // // A continuous force
  //     // rigidBody.current.addForce({ x: 0, y: 10, z: 0 }, true);

  //     // // A one-off torque rotation
  //     // rigidBody.current.applyTorqueImpulse({ x: 0, y: 10, z: 0 }, true);

  //     // // A continuous torque
  //     // rigidBody.current.addTorque({ x: 0, y: 10, z: 0 }, true);
  //   }
  // }, [position1]);

  const collisionEnter = () => {
    console.log("enter collision");
  };

  // useFrame((state, delta) => {
  //   const { forward, backward } = getKeys();

  //   const impulse = { x: 0.001, y: 0, z: 0 };
  //   const torque = { x: 0, y: 0, z: 0 };

  //   const impulseStrength = 0.6 * delta;
  //   const torqueStrength = 0.6 * delta;

  //   if (forward) {
  //     impulse.z -= impulseStrength;
  //   }

  //   if (backward) {
  //     impulse.z += impulseStrength;
  //     torque.x += torqueStrength;
  //   }

  //   lobsterRef.current.applyImpulse(impulse);
  //   lobsterRef.current.applyTorqueImpulse(torque);
  // });

  return (
    <>
      <OrbitControls
        minDistance={5}
        maxDistance={6}
        target={[-0.7, -0.8, -2.2]}
        // enablePan={false}
        // enableRotate={false}
      />
      <Environment preset="apartment" />
      {/* <Physics debug> */}
      <RigidBody
        // canSleep={false}
        type="fixed"
        gravityScale={1}
        restitution={0}
        friction={0.7}
        // gravityScale={1}
        colliders="trimesh"
        position={[-18.05, -2.5, -13.8]}
        ref={stockpotsRef}
        // ref={stockpotsRef}

        // onCollisionEnter={collisionEnter}
      >
        {/* <CuboidCollider args={[2, 1]} position={[-0.5, 4, -1]} /> */}

        <primitive
          // ref={stockpotsRef}
          object={stockpot.scene}
          // position={[-0.5, -1.7, -1]}
          // rotation={[20.15, -80.05, 0.09]}
          scale={0.3}
        />

        {/* <mesh scale={0.7}>
            <sphereGeometry />
            <meshStandardMaterial color="#FFBFC3" />
          </mesh> */}
      </RigidBody>

      <RigidBody
        ref={lobsterRef}
        canSleep={false}
        // type="fixed"
        type="kinematicPosition"
        // ref={lobsterRef}

        restitution={0.2}
        friction={1}
        // gravityScale={1}

        onCollisionEnter={collisionEnter}
        position={[-1.5, -1.9, -5]}
        rotation={[20.15, -80.05, 0.09]}
        // scale={0.9}
      >
        <CylinderCollider
          position={[0.38, 0.2, 0.5]}
          args={[1, 0.79]}
          rotation={[-8, -79.2, 28.5]}
        />
        {/* <mesh> */}
        <primitive
          object={lobster.scene}
          // position={[-1.5, position1, -5]}
          // rotation={[20.15, -80.05, 0.09]}
          scale={0.5}
        />
        {/* </mesh> */}
      </RigidBody>
      {/* </Physics> */}

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
      {/* </Physics> */}
    </>
  );
}
