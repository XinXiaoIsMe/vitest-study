<template>
  <div class="todo-list__item">
    <span class="todo-list__index">{{ index }}.</span>
    <p class="todo-list__affair" :style="{ textDecoration: todo.completed ? 'line-through' : '' }">{{ todo.title }}</p>
    <TodoButton @click="$emit('removeTodo', todo.id)">DELETE</TodoButton>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from './todo';
import TodoButton from './TodoButton.vue';

defineProps<{
  index: number;
  todo: Todo;
}>()

defineEmits<{
  removeTodo: [number]
}>()
</script>

<style lang="scss" scoped>
.todo-list__item {
  display: flex;
  align-items: center;

  .todo-list__index {
    margin-right: 6px;
  }

  .todo-list__affair {
    flex: 1;
  }

  .todo-list__button {
    margin-left: 10px;
  }
}
</style>
