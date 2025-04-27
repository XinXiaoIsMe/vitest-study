<template>
  <button class="todo-button" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

defineEmits<{
  click: []
}>()
</script>

<style lang="scss" scoped>
.todo-button {
  height: 40px;
  padding: 0 10px;
  border: 2px solid gray;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
