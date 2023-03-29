<script setup>
import gallery from "./gallery.vue";
</script>

<template>
  <div>
    <h1>🥷 Nuxt.js File Share</h1>
    <h2>재배포 금지!</h2>
    <Suspense>
      <template #default>
        <gallery />
      </template>
      <template #fallback>
        <div>파일 로딩중...</div>
      </template>
    </Suspense>
  </div>
</template>
