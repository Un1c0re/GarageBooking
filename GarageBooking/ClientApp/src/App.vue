<template>
  <main :style="{ 'margin-bottom': footerHeight + 'px' }">
    <router-view />
  </main>
  <footer ref="footer"></footer>
</template>

<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { ref } from "vue";

const footer = ref();

const { height: footerHeight } = useElementSize(footer);
</script>

<style scoped>
footer {
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>
