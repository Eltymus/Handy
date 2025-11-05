// plugins/three-loaders.client.ts
import { defineNuxtPlugin } from "#app";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { WebGLRenderer } from "three";

export default defineNuxtPlugin(() => {
  // Helper per creare un GLTFLoader già configurato
  function createConfiguredGLTFLoader(renderer?: WebGLRenderer) {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    const draco = new DRACOLoader();
    draco.setDecoderPath("/draco/"); // metti i file qui: /public/draco/*
    loader.setDRACOLoader(draco);

    const ktx2 = new KTX2Loader();
    ktx2.setTranscoderPath("/ktx2/"); // metti i file qui: /public/ktx2/*
    if (renderer) ktx2.detectSupport(renderer);
    loader.setKTX2Loader(ktx2);

    return loader;
  }

  // Espone il factory dove serve
  return {
    provide: { createGLTFLoader: createConfiguredGLTFLoader },
  };
});
