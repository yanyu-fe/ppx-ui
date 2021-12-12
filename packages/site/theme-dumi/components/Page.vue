<script setup lang="ts">
import PageFooter from './PageFooter.vue'
import NextAndPrevLinks from './NextAndPrevLinks.vue'
import Anchor from "./Anchor.vue";
import {useData} from "vitepress";
import {computed} from "vue";
const data = useData();
const headers = computed(() => data.page.value.headers ?? []);
</script>

<template>
  <main class="page">
    <slot name="top" />
    <div class="container">
      <div class="left" :class="[headers.length < 1 ?'left--width':'']">
        <Content class="content" />
        <PageFooter />
        <NextAndPrevLinks />
      </div>
      <div class="right" v-if="headers.length > 0">
        <div class="right-float">
          <Anchor :headers="headers"/>
        </div>
      </div>
    </div>
    <slot name="bottom" />
  </main>
</template>

<style scoped>
.page {
  padding-top: var(--header-height);
  margin-top: 1.5rem;
  margin-right: 1rem;
}

@media (min-width: 720px) {
  .page {
    margin-left: 16.4rem;
  }
}

@media (min-width: 960px) {
  .page {
    margin-left: 20rem;
  }
}

.container {
  //margin: 0 auto;
  //padding: 0 1.5rem 4rem;
  //max-width: 48rem;
  display: flex;
}
.left{
  width: calc(100% - 11rem);
  //background: #2b313a;
}
.left--width{
  width: 100%;
  margin-right: 2rem;
}

.right-float{
  position: fixed;
  right: 1rem;
  width: 10rem;
  height: calc(100vh - var(--header-height) - 3rem);
  overflow-y: auto;
}
.right{
  width: 10rem;
  //background: #1c90f3;
  box-sizing:border-box;
  margin-left: 1rem;
}

.content {
  padding-bottom: 1.5rem;
}

@media (max-width: 420px) {
  .content {
    /* fix carbon ads display */
    clear: both;
  }
  .right{
    display: none;
  }
  .left{
    width: 100%;
    margin-left: 1rem;
  }
}
</style>
