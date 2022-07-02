<template>
  <router-view />
  <q-ajax-bar position="top" size="10px" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
