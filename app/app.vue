<!-- app.vue -->
<template>
  <div class="w-screen h-screen">
    <h1 class="text-white">HALO</h1>
    <ClientOnly>
      <TresCanvas windowSize clearColor="#0a0a0a">
        <!-- Camera + controlli -->
        <TresPerspectiveCamera
          :position="[200, 200, 250]"
          :look-at="[0, 0, 0]" />
        <OrbitControls make-default />

        <!-- Modello dal /public -->
        <Suspense>
          <TresGroup :position="[0, 0, 0]">
            <GLTFModel
              :path="oldPC"
              :cast-shadow="true"
              :receive-shadow="true"
              :position="[0, 0, 0]"
              :scale="[1, 1, 1]" />
            <GLTFModel
              :path="books"
              :cast-shadow="true"
              :receive-shadow="true"
              :position="[200, 0, 0]"
              :scale="[80, 80, 80]" />
            <GLTFModel
              :path="controller"
              :cast-shadow="true"
              :receive-shadow="true"
              :position="[400, 0, 0]"
              :scale="[10, 10, 10]" />
            <GLTFModel
              :path="Headphone"
              :cast-shadow="true"
              :receive-shadow="true"
              :position="[-200, 0, 0]"
              :scale="[120, 120, 120]" />
            <GLTFModel
              :path="luggage"
              :cast-shadow="true"
              :receive-shadow="true"
              :position="[-400, 0, 0]"
              :scale="[100, 100, 100]" />
            <GLTFModel
              :path="Handy"
              :cast-shadow="true"
              :receive-shadow="true"
              :position="[0, 0, -200]"
              :scale="[10, 10, 10]" />
            <GLTFModel
              :path="smartphone"
              :cast-shadow="true"
              :receive-shadow="true"
              :position="[0, 0, 200]"
              :scale="[10, 10, 10]" />
          </TresGroup>
          <template #fallback>
            <div class="loading-overlay">
              Caricamento modello… {{ Math.round(progress * 100) }}%
            </div>
          </template>
        </Suspense>

        <!-- Luci base -->
        <TresAmbientLight :intensity="0.6" />
        <TresDirectionalLight
          :position="[5, 5, 5]"
          :intensity="1.1"
          cast-shadow />
      </TresCanvas>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { GLTFModel, OrbitControls, useProgress } from "@tresjs/cientos";

  /**
   * In Nuxt tutto ciò che è in /public è servito dalla radice del sito.
   * Se hai una baseURL (sito in sottocartella), usiamo app.baseURL per comporre il path giusto.
   */
  const { app } = useRuntimeConfig();
  const baseUrl = app?.baseURL ?? "/";

  const books = computed(() => `${baseUrl}models/books/scene.gltf`);
  const controller = computed(() => `${baseUrl}models/controller/scene.gltf`);
  const Handy = computed(() => `${baseUrl}models/Handy/scene.gltf`);
  const Headphone = computed(() => `${baseUrl}models/Headphone/scene.gltf`);
  const luggage = computed(() => `${baseUrl}models/luggage/scene.gltf`);
  const oldPC = computed(() => `${baseUrl}models/oldPC/scene.gltf`);
  const smartphone = computed(() => `${baseUrl}models/smartphone/scene.gltf`);
</script>

<style>
  html,
  body,
  #__nuxt {
    height: 100%;
    margin: 0;
  }
  .loading-overlay {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: white;
    font-family: system-ui, sans-serif;
    font-size: 14px;
    pointer-events: none;
  }
</style>
