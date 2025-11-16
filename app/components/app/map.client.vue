<script lang="ts" setup>
const colorMode = useColorMode();
const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty",
);
const zoom = 3;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_USA"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
