<template>
  <input
    v-model="value"
    class="todo-input"
    placeholder="Input something..."
    @keyup.enter="$emit('enter', value)"
  />
</template>

<script setup lang="ts">
const value = defineModel<string>({
  default: ''
})
defineEmits<{
  enter: [string]
}>()
</script>

<style lang="scss" scoped>
.todo-input {
  height: 40px;
  border: 2px solid gray;
  border-radius: 0;
  outline: none;
  box-sizing: border-box;
  text-indent: 10px;
}
</style>
