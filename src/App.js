import "./App.css";
import { useState, useEffect } from "react";
import Kitchen from "./Kitchen";
import Loading from "./Loading";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

function App() {
  const [view1, setView1] = useState(false);

  return (
    <div className="game-Container">
      <header className="game-Header">
        <h1 className="game-Header-Title">LOBSTER FLIGHT SIMULATOR</h1>
        {/* <div className="game-Header-Info"> */}
        <div> HIT 5 PANS AND YOU'RE OUT!</div>
        <p className="game-Header-Timer"></p>
        <div className="game-Header-PanCount">PAN COUNT: 0</div>

        {/* </div> */}
      </header>
      <div className="threeD-Container">
        <div className="threeD-Portal">
          <Canvas
            camera={{
              position: [0, 0, 2.5],

              fov: 30,
              near: 5.1,
              far: 1000,
            }}
            resize={{ scroll: false }}
          >
            <directionalLight
              position={[10, 9, -20]}
              color={"grey"}
              angle={-70}
              intensity={0.5}
            />
            <Suspense
              fallback={<Loading position={[1, 0, 1.5]} scale={[5, 5, 5]} />}
            >
              <Kitchen view1={view1} setView1={setView1} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
