<template>
  <n-layout has-sider>
    <n-layout>
      <n-layout-header class="z-5" position="absolute">
        <Header v-model:collapsed="collapsed" />
      </n-layout-header>

      <n-layout-content
        class="h-screen bg-gray-100"
        content-style="padding-top: 64px;"
      >
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
          </transition>
        </router-view>
      </n-layout-content>
      <n-layout-footer> <OptionMenu /></n-layout-footer>
    </n-layout>

    <div
      v-show="isResponsive && !collapsed"
      class="absolute inset-0 z-10 bg-black bg-opacity-50"
      @click="collapsed = true"
    />
  </n-layout>
</template>

<script setup>
import { ref } from 'vue';

import { useResizeObserver } from '@vueuse/core';

const collapsed = ref(false);
const position = ref('static');
const isResponsive = ref(false);

function collapse() {
  collapsed.value = !collapsed.value;
}

const el = ref(document.getElementsByTagName('body')[0]);

useResizeObserver(el, (entries) => {
  const entry = entries[0];
  const { width } = entry.contentRect;

  if (width < 992) {
    if (isResponsive.value) {
      return;
    }
    isResponsive.value = true;
    if (!collapsed.value) {
      position.value = 'absolute';
      collapsed.value = true;
    }
  } else {
    position.value = 'static';
    isResponsive.value = false;
    collapsed.value = false;
  }
});
</script>
<style scoped>
/* header 區塊的style */
.n-layout-header {
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
}
/* content 區塊的style */
.n-layout-content {
  background: #e9e9e9;
  height: 90vh;
}
/* footer 區塊的style */
.n-layout-footer {
  background: #ffffff;
}
</style>
