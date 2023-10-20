import {
  useMatcapTexture,
  useTexture,
  Center,
  Text3D,
  OrbitControls,
  MeshPortalMaterial,
  CameraControls,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { easing } from "maath";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 36);

export default function Kitchen(props) {
  const [rotateY, setRotateY] = useState(0);
  const [position1, setPosition1] = useState(0);
  const sphere1 = useRef();
  // const sceneRotate = useRef();
  // sceneRotate.rotation.y = rotateY;
  // sceneRotate.rotation = { x: 0, y: 0, z: 0 };

  const map = useTexture("./maptexture1.jpg");

  function handleButtonForward(evt) {
    // setRotateY(rotateY + 0.02);
    setPosition1(position1 + 0.2 / 2);

    // if (positionY < 3.9) {
    //   setPositionY(positionY + 0.1);
    // } else if (positionY > -3.9) {
    //   setPositionY(positionY - 0.1);
    // } else {
    //   setPositionY(positionY - 0.1);
    // }

    console.log(position1);
  }

  // const normalMap = useTexture("./textures/texture3.jpg");

  // const portal = useRef();
  // useFrame((state, dt) =>
  //   easing.damp(portal.current, "blend", props.view1 ? 1 : 0, 0.05, dt)
  // );

  useFrame((state, delta) => {
    sphere1.current.rotation.y -= delta * 0.5;
    // sphere1.current.position.z += delta * 0.51;

    // sphere1.current.rotation.z -= delta * 0.003;

    // sphere1.current.rotation.x += delta * 0.2;
  });
  return (
    <>
      {/* <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3, 6]} />
        <MeshPortalMaterial
          ref={portal}
          // blend={props.boolean1 ? 1 : 0}
        > */}
      <OrbitControls
        minDistance={2}
        maxDistance={10}
        target={[-0.7, -0.8, -2.2]}
      />
      <Environment preset="apartment" />

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
        position={[0.5, -2.6, -5]}
        onClick={(e) => {
          handleButtonForward();
        }}
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
        position={[0.5, -3, -5]}
        onClick={(e) => {
          handleButtonForward();
        }}
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
