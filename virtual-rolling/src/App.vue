<template>
   <ul @scroll="handleScroll">
     <li class="scroll-runway" :style="`transform: translateY(${runwayEnd}px)`"></li>
     <li class="item" v-for="item in data.visibleData" :style="`transform: translateY(${item.index * FIX_HEIGHT}px)`" :key="item">{{item.index}}</li>
   </ul>
</template>

<script setup>
import { reactive, onMounted } from 'vue'


const data = reactive({
  listData: [],
  visibleData: [],
  firstAttachedIdx: 0,
  lastAttachedIdx: 0,
  anchorItem: {
    index: 0,
    offset: 0
  }
});

let runwayEnd = 0;
let lastScrollTop = 0;
const FIX_HEIGHT = 180;
const BUFFER_SIZE = 3;
const VISIBLE_COUNT = BUFFER_SIZE * 2

const fetchData = (startIndex = 0) => {
  const result = []
  for (let i = startIndex; i < startIndex + 50; i++) {
    const item = {};
    item.index = i;
    item.scroll = runwayEnd + i * FIX_HEIGHT
    result.push(item);
  }
  return result;
}

const updateAnchorItem = (scrollTop) => {
  const newIndex = Math.floor(scrollTop / FIX_HEIGHT);
  const offset = scrollTop - newIndex * FIX_HEIGHT
  data.anchorItem = { index: newIndex, offset }
}

const handleScroll = (e) => {
  const scrollTop = e.target.scrollTop;
  const delta = scrollTop - lastScrollTop;
  lastScrollTop = scrollTop;

  data.anchorItem.offset += delta;

  const isPositive = delta > 0;
  if (isPositive) {
    if (data.anchorItem.offset >= FIX_HEIGHT) {
      updateAnchorItem(scrollTop);
    }

    if (data.anchorItem.index - BUFFER_SIZE > data.firstAttachedIdx) {
      data.firstAttachedIdx = Math.min(data.listData.length - BUFFER_SIZE - VISIBLE_COUNT, data.anchorItem.index - BUFFER_SIZE);
    }
  } else {
    if (scrollTop <= 0) {
      data.anchorItem = { index: 0, offset: 0 };
    } else if (data.anchorItem.offset < 0) {
      updateAnchorItem(scrollTop);
    }

    if (data.anchorItem.index + BUFFER_SIZE < data.lastAttachedIdx) {
      data.firstAttachedIdx = Math.max(0, data.anchorItem.index - BUFFER_SIZE);
    }
  }
  data.lastAttachedIdx = Math.min(data.listData.length, data.firstAttachedIdx + BUFFER_SIZE * 2 + VISIBLE_COUNT)
  data.visibleData = data.listData.slice(data.firstAttachedIdx, data.lastAttachedIdx);
}

onMounted(() => {
  data.listData = fetchData();
  runwayEnd = data.listData.length * FIX_HEIGHT;
  data.lastAttachedIdx = BUFFER_SIZE * 2 + VISIBLE_COUNT + data.firstAttachedIdx;
  data.visibleData = data.listData.slice(data.firstAttachedIdx, data.lastAttachedIdx);
})

</script>

<style lang="less">
html, body {
  height: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  ul {
    margin: 0;
    height: 100%;
    will-change: transform;
    overflow-y: auto;
    li {
      list-style: none
    }
    .item {
      height: 170px;
      padding: 0px;
      margin: 0 auto;
      background: pink;
      border-radius: 10px;
      position: absolute;
      width: 100%;
    }
  }
}
</style>
