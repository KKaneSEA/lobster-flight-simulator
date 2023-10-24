import "./App.css";
import { useState, useEffect } from "react";
import Kitchen from "./Kitchen";
import Restart from "./Restart";

import { Suspense, useRef } from "react";
import Loading from "./Loading";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Environment, KeyboardControls } from "@react-three/drei";
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

function App() {
  const [view1, setView1] = useState(false);
  const [panCount, setPanCount] = useState(0);

  return (
    <div className="game-Container">
      <header className="game-Header">
        <h1 className="game-Header-Title">LOBSTER FLIGHT SIMULATOR</h1>
        {/* <div className="game-Header-Info"> */}
        {/* <div className="game-Header-P"> HIT 5 STOCK POTS AND YOU'RE OUT!</div> */}
        <div className="game-Header-P"> WATCH OUT FOR THE STOCK POTS!</div>
        <p className="game-Header-Timer"></p>
        <div className="game-Header-PanCount">
          {/* STOCK POT COUNT: {panCount} */}
        </div>

        {/* </div> */}
      </header>
      <div className="threeD-Container">
        <div className="threeD-Portal">
          {panCount >= 5 ? (
            <Restart panCount={panCount} setPanCount={setPanCount} />
          ) : (
            <KeyboardControls
              map={[
                { name: "forward", keys: ["ArrowUp", "KeyW"] },
                { name: "backward", keys: ["ArrowDown", "KeyS"] },
              ]}
            >
              <Canvas
                camera={{
                  position: [0, 0, 2.5],

                  fov: 30,
                  near: 1,
                  // far: 1000,
                  far: 100,
                }}
                resize={{ scroll: false }}
              >
                {/* <Loading /> */}
                <Suspense
                  fallback={
                    <Loading
                      // position={[1, -2, -2.5]}
                      scale={[1, 1, 1]}
                    />
                  }
                >
                  <directionalLight
                    position={[10, 9, -20]}
                    color={"grey"}
                    angle={-70}
                    intensity={0.5}
                  />
                  <Physics debug>
                    <Kitchen view1={view1} setView1={setView1} />
                  </Physics>
                </Suspense>
              </Canvas>
            </KeyboardControls>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
