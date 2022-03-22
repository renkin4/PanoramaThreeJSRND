<template>
  <Scene>
    <Renderer antialias>
      <PerspectiveCamera
        :fov="75"
        :aspect="aspectRatio"
        :position="new Vector3(0, 0, 5)"
      />
      <Object3D/>
    </Renderer>
  </Scene>
</template>

<script setup lang="ts">
import { Vector3 } from "three";
import { Renderer, Scene, PerspectiveCamera, Object3D } from './core';

let aspectRatio = window.innerWidth / window.innerHeight;

</script>

<style> 
</style>
