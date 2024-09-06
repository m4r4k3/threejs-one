import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
  useTexture,
  Text
} from "@react-three/drei";

import { useRef } from "react";
import { DirectionalLightHelper } from "three";
function Torus() {
  const torus = useRef();
  useFrame((state, delta) => {
    torus.current.rotation.y += delta * 0.1;
    torus.current.rotation.z += delta *2;
  });
  return (
    <mesh ref={torus}>
      <torusGeometry  rotateX={0.5} args={[3, 0.01]}></torusGeometry>
      <meshStandardMaterial color={"white"}></meshStandardMaterial>
    </mesh>
  );
}

function Sphere() {
  const sphere = useRef();
  const texture = useTexture(
    "https://images-ext-1.discordapp.net/external/7vXcnf0Z3en8EC0FlEEWHexlf6YxBAlsbDeVsE__syw/%3Frik%3DGyv481jStoyipw%26riu%3Dhttp%253a%252f%252fi.imgur.com%252fWdffsEI.jpg%26ehk%3DB3g%252bimD%252fu7iam4rbK4WFc81e4odqD%252fCnvv1PTlVCDO8%253d%26risl%3D%26pid%3DImgRaw%26r%3D0/https/th.bing.com/th/id/R.b02405f5cc82d16d153f593d9b35fabc?format=webp&width=960&height=480"
  );
  const normal = useTexture(
    "https://media.discordapp.net/attachments/775448139938922540/1281383075674329131/marsbump_Mars_Normal_Maps_1__Don_Edwards.png?ex=66db847c&is=66da32fc&hm=cb290f5bed5efe3df39ee3c5c52d07dda1796c8cd87a4fecf1264251eadf42a0&=&format=webp&quality=lossless&width=550&height=275"
  );
  useFrame((state, delta) => {
    sphere.current.rotation.y += delta * 0.1;
  });
  return (
    <mesh ref={sphere}>
      <sphereGeometry args={[2.4, 64]}></sphereGeometry>
      <meshStandardMaterial
        map={texture}
        normalMap={normal}
      ></meshStandardMaterial>
    </mesh>
  );
}

function Marak() {
  const text = useRef();

  // useFrame((state, delta) => {
  //   text.current.rotation.y += delta * 0.1;
  // });
  useFrame((state , delta)=>{
    text.current.position.x+=2*delta
  })
  return (
    <Text
      ref={text}
      position={[-30, 0, -30]} // Position of the text
      fontSize={5}
      color="white"
      anchorX="center"
      anchorY="middle"
      bevelEnabled={true}
      bevelSize={0.05}
      bevelThickness={0.2}
      maxWidth={200} 
    >
     M4R4K3 
   
    </Text>
  );
}

function Sun() {
  const sphere = useRef();
  useFrame((state, delta) => {
    sphere.current.rotation.y += delta * 0.1;
  });
  return (
    <mesh ref={sphere} position={[1, 1, 500]}>
      <sphereGeometry args={[20, 64]}></sphereGeometry>
      <meshBasicMaterial color={"yellow"}></meshBasicMaterial>
    </mesh>
  );
}
function Star() {
  const sphere = useRef();

  useFrame((state, delta) => {
    sphere.current.rotation.y += delta;
  });
  return (
    <mesh
      ref={sphere}
      position={[
        Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
        Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
        Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
      ]}
    >
      <sphereGeometry args={[1, 64]}></sphereGeometry>
      <meshBasicMaterial color={"white"}></meshBasicMaterial>
    </mesh>
  );
}

function Scene() {
  const dref = useRef();

  return (
    <>
      <OrbitControls></OrbitControls>
      <directionalLight ref={dref} position={[1, 1, 500]}></directionalLight>
      <Marak />
      <Torus />
      <Sun />
      {[...Array(1000)].map((e) => (
        <Star />
      ))}
      <Sphere />
    </>
  );
}

function App() {
  return (
    <>
      <Canvas gl={{ antialias: true }} style={{ background: "black" }}>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
