<template>
  <div class="anchor-link" :class="[active?'anchor-link--active':'']">
    <a :href="'#'+link" class="anchor-link-title"
       :class="[
         ellipsis ? 'anchor-link-title--ellipsis':'',
         active?'anchor-link-title--active':''
       ]"
       :style="{
          marginLeft:level + 'rem',
          fontSize:(15 - level) + 'px'
       }">{{ title }}</a>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
const props = defineProps({
  active:{
    type:Boolean,
    default:false
  },
  title:{
    type:String,
    default:""
  },
  link:{
    type:String,
    default:""
  },
  level:{
    type:Number,
    default:1
  },
  ellipsis:{
    type:Boolean,
    default:true
  }
})
</script>

<style scoped>
.anchor-link{
  border-left: 2px solid var(--c-border);
  padding: 3px 0;
  transition: all .5s;
}
.anchor-link-title{
  margin-left: 1rem;
  color: var(--c-text);
  box-sizing:border-box;
  display: block;
  text-decoration: none;
}

.anchor-link-title--active{
  color: var(--c-brand);
}
.anchor-link-title--ellipsis{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.anchor-link--active{
  border-color: var(--c-brand);
}
</style>
