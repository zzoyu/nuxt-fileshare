<script setup>
import gallery from "./gallery.vue";
</script>

<template>
  <div>
    <h1>🥷 File Share</h1>
    <h2>재배포 금지! 접근 IP 누적 시 24시간 차단</h2>
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
