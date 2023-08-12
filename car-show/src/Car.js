import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

const cars = [
  {
    url: "models/car/corvette/scene.gltf",
    scale: 0.005,
    yPosition: -0.035,
  },
  {
    url: "models/car/bmw-e30/scene.gltf",
    scale: 1,
    yPosition: 0,
  }
]
// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export function Car() {
  const [corvette, bmw] = cars
  const car = corvette


  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + car.url
  );

  useEffect(() => {
    gltf.scene.scale.set(car.scale, car.scale, car.scale);
    gltf.scene.position.set(0, car.yPosition, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime();


    if(car === corvette) {
      let group = gltf.scene.children[0].children[0].children[0];
      group.children[0].rotation.x = t * 2;
      group.children[2].rotation.x = t * 2;
      group.children[4].rotation.x = t * 2;
      group.children[6].rotation.x = t * 2;
    }
  });

  return <primitive object={gltf.scene} />;
}
