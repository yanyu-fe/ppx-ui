<template>
  <div class="anchor-container">
    <!--    传入默认插槽-->
    <template  v-for="(header,index) in headers" :key="'header_'+index">
      <AnchorLink :level="header.level ? header.level - 1 : 1" :active="index === current" :title="header.title" :link="header.slug" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Header } from "vitepress";
import { defineProps, PropType } from "vue"
import AnchorLink from "./AnchorLink.vue";
import {useAnchorActive} from "../composables/anchorActive";
const props = defineProps({
  headers:{
    type:Array as PropType<Header>,
    default:() =>([])
  }
})
const { current } = useAnchorActive();
</script>

<style scoped>
.anchor-container{
  position: relative;
}
.anchor-line{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
