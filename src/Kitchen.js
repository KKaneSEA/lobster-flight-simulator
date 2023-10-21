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
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { easing } from "maath";
import {
  Debug,
  RigidBody,
  Physics,
  CylinderCollider,
  CuboidCollider,
  BallCollider,
} from "@react-three/rapier";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 36);

export default function Kitchen(props) {
  const [rotateY, setRotateY] = useState(0);
  const [position1, setPosition1] = useState(-1.9);
  const sphere1 = useRef();
  const lobsterRef = useRef();
  const box = useRef();

  const [hovered, setHovered] = useState(false);

  // const sceneRotate = useRef();
  // sceneRotate.rotation.y = rotateY;
  // sceneRotate.rotation = { x: 0, y: 0, z: 0 };

  const map = useTexture("./maptexture1.jpg");
  const lobster = useGLTF("./models/lobster.glb");

  function handleButtonUp(evt) {
    if (position1 <= -0.5) {
      setPosition1(position1 + 0.22);
    } else return;

    console.log(position1);
  }

  function handleButtonDown(evt) {
    if (position1 >= -3.3) {
      setPosition1(position1 - 0.22);
    } else return;

    console.log(position1);
  }

  // const normalMap = useTexture("./textures/texture3.jpg");

  // const portal = useRef();
  // useFrame((state, dt) =>
  //   easing.damp(portal.current, "blend", props.view1 ? 1 : 0, 0.05, dt)
  // );

  useFrame((state, delta) => {
    sphere1.current.rotation.y -= delta * 0.35;

    // sphere1.current.rotation.x -= delta * 0.005;

    // sphere1.current.rotation.z -= delta * 0.003;

    // sphere1.current.rotation.x += delta * 0.2;
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const collisionEnter = () => {
    console.log("enter collision");
  };

  return (
    <>
      {/* <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3, 6]} />
        <MeshPortalMaterial
          ref={portal}
          // blend={props.boolean1 ? 1 : 0}
        > */}
      <OrbitControls
        minDistance={5}
        maxDistance={6}
        target={[-0.7, -0.8, -2.2]}
        // enablePan={false}
        // enableRotate={false}
      />
      <Environment preset="apartment" />
      <Physics debug>
        <RigidBody
          // canSleep={false}
          type="fixed"
          gravityScale={1}
          // gravityScale={1}
          // colliders="ball"
          position={[-1.5, 0.6, -5]}
          ref={box}
          // onCollisionEnter={collisionEnter}
        >
          <CuboidCollider args={[0.5]} />
          <mesh scale={0.7}>
            <sphereGeometry />
            <meshStandardMaterial color="#FFBFC3" />
          </mesh>
        </RigidBody>

        <RigidBody
          // canSleep={false}
          type="fixed"
          // type="kinematicPosition"
          ref={lobsterRef}
          // gravityScale={1}
          // colliders={false}
          onCollisionEnter={collisionEnter}
          position={[-1.5, position1, -5]}
          rotation={[20.15, -80.05, 0.09]}
          // scale={0.9}
        >
          <CylinderCollider
            position={[0.38, 0.2, 0.5]}
            args={[1, 0.79]}
            rotation={[-8, -79.2, 28.5]}
          />
          <mesh>
            <primitive
              object={lobster.scene}
              // position={[-1.5, position1, -5]}
              // rotation={[20.15, -80.05, 0.09]}
              scale={0.5}
            />
          </mesh>
        </RigidBody>
      </Physics>

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
        {" "}
        DOWN
        <meshStandardMaterial metalness={0.2} roughness={0} color={"black"} />
      </Text3D>

      <mesh
        position={[position1, 0, position1]}
        rotation={[0, 0, 0]}
        ref={sphere1}
        // onClick={(evt) => {
        //   props.setView1(!props.view1);

        //   evt.stopPropagation();
        // }}
      >
        <sphereGeometry
          // position={[1, 1.6, 1]}
          // ref={sphere1}
          args={[10, 64, 64]}
        />
        <meshStandardMaterial
          map={map}
          // normalMap={normalMap}
          side={THREE.BackSide}
        />
      </mesh>

      {/* </MeshPortalMaterial>
      </mesh> */}
    </>
  );
}
