# Lobster Flight Simulator

A 3D browser game built with React Three Fiber where you pilot a lobster through a kitchen, dodging spinning stock pots. Hit a pot and it's game over.

**[Play it live](https://lobster-flight-simulator.vercel.app/)**

## How to Play

- **Arrow Up / W** — Move the lobster up
- **Arrow Down / S** — Move the lobster down
- You can also click the **UP** and **DOWN** buttons in the scene
- Avoid the rotating stock pot — colliding with it ends the game

## Tech Stack

- **React** with Create React App
- **React Three Fiber** — React renderer for Three.js
- **@react-three/drei** — Helpers (OrbitControls, Text3D, Environment, KeyboardControls, GLTF loading)
- **@react-three/rapier** — Physics engine (rigid bodies, colliders, collision detection)
- **maath** — Math utilities for easing
- **Deployed on Vercel**

## Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm start
```

Open [http://localhost:3000](http://localhost:3000) to play locally.

## Building for Production

```bash
npm run build
```

Creates an optimized build in the `build` folder, ready for deployment.

## Project Structure

- `App.js` — Main game container, manages game state (active vs. game over), sets up the Canvas and physics world
- `Kitchen.js` — Core game scene: loads the lobster and stock pot models, handles movement physics, collision detection, and the environment sphere
- `Restart.js` — Game over screen with a "Play Again" button
- `Loading.js` — Suspense fallback while 3D assets load

## Assets

The game uses GLTF models (`lobster.glb`, `stockpot.glb`) and a texture map (`maptexture1.jpg`) for the environment sphere, stored in the `public` directory.
