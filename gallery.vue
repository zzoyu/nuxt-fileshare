<script setup>
const files = ref([]);
const filesNumber = ref(0);
const page = ref(1);
const limit = ref(0);
await $fetch("/api/files").then((response) => {
  files.value = response.files;
  filesNumber.value = response.total;
  limit.value = response.limit;
});

const download = (file) => {
  const link = document.createElement("a");
  link.href = `/api/file/${encodeURIComponent(file)}`;
  link.setAttribute("download", file);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

const loadMore = () => {
  page.value++;
  $fetch(`/api/files?page=${page.value}&limit=${limit.value}`).then(
    (response) => {
      files.value = [...files.value, ...response.files];
      filesNumber.value = response.total;
      limit.value = response.limit;
    }
  );
};

console.log(files.value);
</script>

<template>
  <div>
    <small
      >파일 개수 총 <span class="number">{{ filesNumber }}</span
      >개</small
    >
    <ul v-if="filesNumber">
      <li
        v-for="(file, index) in files"
        @click="download(file)"
        :key="file"
        :datatype="file"
      >
        <p>{{ file }}</p>
      </li>
    </ul>
    <div v-else>파일이 존재하지 않습니다.</div>
    <button @click="loadMore()">더 보기</button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
ul {
  width: 100%;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 0.5rem;
  place-items: center;
}
li {
  width: 200px;
  height: 100px;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 0 1rem 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0.2rem;
}
li:hover {
  transform: scale(1.05);
}

p {
  width: 100%;
  white-space: break-spaces;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: small;
}

li::before {
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none;
  padding: 0.2rem;
  border-radius: 0 0 0.5rem 0;
  font-size: x-small;
  font-weight: bold;
}

li[datatype$=".pdf"]::before {
  content: "PDF";
  color: #fff;
  background-color: #ff0000;
}

li[datatype$=".epub"]::before {
  content: "EPUB";
  color: #fff;
  background-color: #0000ff;
}

li.visited {
  pointer-events: none;
  /* disable dragging */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  /* disable selection */
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
li.visited > p {
  opacity: 0.3;
}

li.visited::after {
  position: absolute;
  content: "다운로드가 완료되었습니다.";
}

span.number {
  font-weight: bold;
  font-size: large;
}

button {
  padding: 1rem 2rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
</style>
