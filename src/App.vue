<template>
  <Scene ref="myScene">
    <Renderer antialias>
      <PerspectiveCamera
        :fov="75"
        :aspect="aspectRatio"
        :position="new Vector3(0, 0, 5)"
      /> 
      <Box :size="1" ref="box" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
        <BasicMaterial />
      </Box>
    </Renderer>
  </Scene>
</template>

<script setup lang="ts">
import { Vector3 } from "three";
import { onMounted, ref } from "vue";
import { Renderer, Scene, PerspectiveCamera } from './core';
import { SceneSetupInterface } from './core/Scene';
import { BasicMaterial } from "./materials/Material";
import Box from "./meshes/Box";

let aspectRatio = window.innerWidth / window.innerHeight;
let myScene = ref(null);

onMounted(()=>{
  const scene = myScene?.value as unknown as SceneSetupInterface;
  setTimeout(()=>{
    console.log(scene.scene);
  }, 1000);
});

</script>

<style> 
</style>
